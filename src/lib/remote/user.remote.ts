import { query, form } from '$app/server';

import { db, auth } from '$lib/server';
import { UserDTO } from '$lib/dto';

import { faker } from '@faker-js/faker';

export const getAllUsers = query(UserDTO.GET_USERS, async ({ offset, limit }) => {
	return await db.query.user.findMany({
		offset: offset,
		limit: limit
	});
});

export const getUserById = query(UserDTO.GET_USER_BY_ID, async (id) => {
	return await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.id, id)
	});
});

// UserDTO.CREATE_USER,
export const createUser = form(async () => {
	console.log('Creating user...');

	const data = await auth.api
		.signUpEmail({
			body: {
				name: faker.person.firstName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}
		})
		.then((response) => {
			console.log('User created successfully:', response);
		})
		.catch((error) => {
			console.error('Error creating user:', error);
			throw error;
		});

	console.log('User creation data:', data);
});
