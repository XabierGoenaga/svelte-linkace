import { error } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';

import { db, tags } from '$lib/server';
import { getPaginationParams } from '$lib/utils';
import { TagDTO } from '$lib/dto';

export const getTags = query(async () => {
	const request = getRequestEvent();
	const { page, offset, limit } = getPaginationParams();

	return db.query.tags.findMany({
		offset: page * offset,
		limit: limit,
		where: (tags, { eq }) => eq(tags.userId, request.locals.user.id),
		orderBy: (tags, { desc }) => desc(tags.createdAt)
	});
});

export const getTagById = query(TagDTO.GET_BY_ID, async (id) => {
	const { locals } = getRequestEvent();

	const tag = await db.query.tags.findFirst({
		where: (tags, { and, eq }) => and(eq(tags.id, id), eq(tags.userId, locals.user.id))
	});

	if (!tag) {
		throw error(404, 'Tag not found');
	}

	return tag;
});

export const getTagByName = query(TagDTO.GET_BY_NAME, async (name) => {
	const request = getRequestEvent();

	return await db.query.tags.findMany({
		with: { owner: true },
		where: (tags, { and, ilike, eq }) =>
			and(ilike(tags.name, `%${name}%`), eq(tags.userId, request.locals.user.id))
	});
});

export const createTag = form(TagDTO.CREATE_TAG, async ({ name }) => {
	const { locals } = getRequestEvent();

	return await db
		.insert(tags)
		.values({
			name,
			userId: locals.user.id
		})
		.returning();
});
