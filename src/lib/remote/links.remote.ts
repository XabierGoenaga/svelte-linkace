import { error, redirect } from '@sveltejs/kit';
import { count, eq } from 'drizzle-orm';

import { command, form, getRequestEvent, query } from '$app/server';

import { LinkDTO } from '$lib/dto';
import { db, links, linksToTags } from '$lib/server';
import { getPaginationParams } from '$lib/utils';

export const getLinks = query(async () => {
	const request = getRequestEvent();
	const { page, offset, limit } = getPaginationParams();

	return await db.query.links.findMany({
		offset: page * offset,
		limit: limit,
		with: {
			linksToTags: {
				with: {
					tag: true
				}
			}
		},
		where: (links, { eq }) => eq(links.userId, request.locals.user.id),
		orderBy: (links, { desc }) => [desc(links.createdAt)]
	});
});

export const getLinksCount = query(async () => {
	const result = await db.select({ count: count().as('count') }).from(links);
	return result[0]?.count ?? 0;
});

export const getFavoriteLinks = query(async () => {
	const { page, offset, limit } = getPaginationParams();

	return await db.query.links.findMany({
		offset: page * offset,
		limit: limit,
		where: (links, { eq }) => eq(links.favorite, true),
		orderBy: (links, { desc }) => [desc(links.createdAt)]
	});
});

export const getFavoriteLinksCount = query(async () => {
	const result = await db
		.select({ count: count().as('count') })
		.from(links)
		.where(eq(links.favorite, true));
	return result[0]?.count ?? 0;
});

export const getLinkById = query(LinkDTO.GET_BY_ID, async (id) => {
	const link = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.id, id)
	});

	if (!link) {
		throw error(404, 'Link not found');
	}

	return link;
});

export const createLink = form(LinkDTO.CREATE, async ({ title, url, description, tags }) => {
	const { locals } = getRequestEvent();

	const insertedLinks = await db
		.insert(links)
		.values({
			title,
			url,
			description,
			userId: locals.user.id
		})
		.returning();

	if (tags && tags.length > 0) {
		await db.transaction(async (tx) => {
			insertedLinks.forEach((link) => {
				tags.forEach(async (tagId) => {
					await tx.insert(linksToTags).values({
						linkId: link.id,
						tagId
					});
				});
			});
		});
	}

	redirect(303, '/links');
});

export const toggleLinkFavorite = command(LinkDTO.TOGGLE_FAVORITE_ID, async (id) => {
	const link = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.id, id)
	});

	if (!link) {
		throw error(404, 'Link not found');
	}

	await db
		.update(links)
		.set({
			favorite: !link.favorite
		})
		.where(eq(links.id, id));
});
