import { query, form, getRequestEvent, command } from '$app/server';
import { ListDTO } from '$lib/dto/lists.dto';
import { db, lists } from '$lib/server';
import { getPaginationParams } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';

export const getLists = query(async () => {
	const request = getRequestEvent();
	const { page, offset, limit } = getPaginationParams();

	return await db.query.lists.findMany({
		offset: page * offset,
		limit: limit,
		where: (lists, { eq }) => eq(lists.userId, request.locals.user.id),
		orderBy: (lists, { desc }) => [desc(lists.createdAt)]
	});
});

export const getListsById = query(ListDTO.GET_BY_ID, async (id) => {
	const { locals } = getRequestEvent();

	const list = await db.query.lists.findFirst({
		where: (lists, { and, eq }) => and(eq(lists.id, id), eq(lists.userId, locals.user.id))
	});

	if (!list) {
		throw error(404, 'List not found');
	}

	return list;
});

export const createLists = form(ListDTO.CREATE, async (data) => {
	const { locals } = getRequestEvent();

	return await db.insert(lists).values({
		name: data.name,
		userId: locals.user.id
	});
});

export const deleteListsById = command(ListDTO.DELETE_BY_ID, async (id) => {
	const { locals } = getRequestEvent();
	const list = await db.query.lists.findFirst({
		where: (lists, { and, eq }) => and(eq(lists.id, id), eq(lists.userId, locals.user.id))
	});

	if (!list) {
		throw error(404, 'List not found');
	}

	await db.delete(lists).where(and(eq(lists.id, id), eq(lists.userId, locals.user.id)));
});
