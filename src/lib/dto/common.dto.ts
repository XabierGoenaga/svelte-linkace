import { pipe, number, finite, minValue, maxValue } from 'valibot';

export const PaginationDTO = {
	offset: pipe(number(), finite(), minValue(0)),
	limit: pipe(number(), finite(), minValue(0), maxValue(100))
};

export const CommonDTO = {
	Pagination: {
		Offset: PaginationDTO
	}
};
