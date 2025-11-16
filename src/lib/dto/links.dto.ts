import {
	object,
	pipe,
	string,
	number,
	url,
	optional,
	finite,
	minValue,
	transform,
	array
} from 'valibot';

const GET_BY_ID = pipe(
	string(),
	transform((value) => Number(value)),
	number(),
	finite(),
	minValue(1)
);

const CREATE = object({
	title: pipe(string()),
	url: pipe(string(), url()),
	description: optional(string()),
	tags: optional(array(string()), [])
});

const TOGGLE_FAVORITE_ID = pipe(number(), finite(), minValue(1));

export const LinkDTO = {
	GET_BY_ID,
	CREATE,
	TOGGLE_FAVORITE_ID
};
