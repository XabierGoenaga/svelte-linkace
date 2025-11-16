import { object, number, fallback } from 'valibot';

export const PaginationDTO = object({
	page: fallback(number(), 1),
	offset: fallback(number(), 0),
	limit: fallback(number(), 10)
});
