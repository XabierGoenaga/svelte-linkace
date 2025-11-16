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

export const TagDTO = {
	GET_BY_ID,
	CREATE_TAG
};
