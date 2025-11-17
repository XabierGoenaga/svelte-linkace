import { getRequestEvent } from '$app/server';
import { PaginationDTO } from '$lib/dto';
import { validateSearchParams } from 'runed/kit';

export const getPaginationParams = () => {
	const request = getRequestEvent();
	const { data } = validateSearchParams(request.url, PaginationDTO);

	return data;
};
