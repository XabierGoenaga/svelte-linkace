import { finite, minLength, minValue, number, object, pipe, string } from 'valibot';

const GET_LIST_BY_ID = pipe(number(), finite(), minValue(1));
const CREATE_LIST = object({ name: pipe(string(), minLength(1)) });
const DELETE_LIST_BY_ID = pipe(number(), finite(), minValue(1));

export const ListDTO = {
	GET_BY_ID: GET_LIST_BY_ID,
	CREATE: CREATE_LIST,
	DELETE_BY_ID: DELETE_LIST_BY_ID
};
