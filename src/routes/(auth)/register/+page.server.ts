import { faker } from '@faker-js/faker';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: 'password123',
		confirmPassword: 'password123'
	};
};
