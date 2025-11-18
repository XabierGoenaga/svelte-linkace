import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth';

import { query, form } from '$app/server';

import { getPaginationParams, getQuerySearch } from '$lib/utils';
import { db, auth } from '$lib/server';
import { UserDTO } from '$lib/dto';

export const getAllUsers = query(async () => {
	const { offset, limit } = getPaginationParams();

	const searchByEmail = getQuerySearch();

	return await db.query.user.findMany({
		offset: offset,
		limit: limit,
		where: (user, { like, or }) =>
			searchByEmail
				? or(like(user.email, `%${searchByEmail}%`), like(user.name, `%${searchByEmail}%`))
				: undefined,
		orderBy: (user, { desc }) => [desc(user.createdAt)]
	});
});

export const getUserById = query(UserDTO.GET_USER_BY_ID, async (id) => {
	return await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.id, id)
	});
});

export const createUser = form(UserDTO.CREATE_USER, async (data) => {
	try {
		await auth.api.signUpEmail({
			body: {
				name: data.name,
				email: data.email,
				password: data.password
			}
		});
	} catch (error) {
		if (error instanceof APIError) {
			// invalid(invalid.email(`we don't have enough hotcakes`));
			// // if (error.name === 'EMAIL_ALREADY_REGISTERED') {
			// // 	console.log('Email already registered');
			// // }
		}
	}

	// redirect(303, '/login');
});
