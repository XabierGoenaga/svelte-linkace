import { pipe, string, minLength, maxLength, object, email, nonEmpty, uuid } from 'valibot';

import { CommonDTO } from '$lib/dto';

const GET_USERS = object({ ...CommonDTO.Pagination.Offset });
const GET_USER_BY_ID = pipe(string(), uuid());
const CREATE_USER = object({
	name: pipe(string(), minLength(3), maxLength(30)),
	email: pipe(string(), email(), minLength(5), maxLength(100)),
	password: pipe(string(), nonEmpty('Please enter your password.'), minLength(8), maxLength(100)),
	confirmPassword: string()
});

export const UserDTO = {
	GET_USERS,
	GET_USER_BY_ID,
	CREATE_USER
};
