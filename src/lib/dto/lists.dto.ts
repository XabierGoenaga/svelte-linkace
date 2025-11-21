import {
	string,
	number,
	boolean,
	object,
	array,
	finite,
	minLength,
	minValue,
	optional,
	pipe
} from 'valibot';

const GET_LIST_BY_ID = pipe(number(), finite(), minValue(1));
const CREATE_LIST = object({
	name: pipe(string(), minLength(1)),
	editable: optional(boolean(), false),
	sharedWithUserIds: optional(array(pipe(string())), [])
});

const GET_LIST_BY_NAME = pipe(string());

const ADD_LINKS_TO_LIST = object({
	listId: number(),
	ids: array(pipe(number(), finite(), minValue(1)))
});
const DELETE_LIST_BY_ID = pipe(number(), finite(), minValue(1));

export const ListDTO = {
	GET_BY_ID: GET_LIST_BY_ID,
	CREATE: CREATE_LIST,
	GET_BY_NAME: GET_LIST_BY_NAME,
	ADD_LINKS_TO_LIST: ADD_LINKS_TO_LIST,
	DELETE_BY_ID: DELETE_LIST_BY_ID
};
