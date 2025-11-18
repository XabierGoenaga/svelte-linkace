import { pipe, string, minLength, maxLength, object, email, nonEmpty, uuid } from 'valibot';

const GET_USER_BY_ID = pipe(string(), uuid());
const CREATE_USER = object({
	name: pipe(string(), minLength(3), maxLength(30)),
	email: pipe(string(), email(), minLength(5), maxLength(100)),
	password: pipe(string(), nonEmpty('Please enter your password.'), minLength(8), maxLength(100)),
	confirmPassword: string()
});

export const UserDTO = {
	GET_USER_BY_ID,
	CREATE_USER
};
