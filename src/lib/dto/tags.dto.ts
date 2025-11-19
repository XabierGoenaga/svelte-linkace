import { object, pipe, string, number, finite, minValue, transform, minLength } from 'valibot';

const GET_BY_ID = pipe(
	string(),
	transform((value) => Number(value)),
	number(),
	finite(),
	minValue(1)
);
const CREATE_TAG = object({
	name: pipe(string(), minLength(1))
});

const SEARCH_BY_NAME = pipe(string());

export const TagDTO = {
	GET_BY_ID,
	SEARCH_BY_NAME,
	CREATE_TAG
};
