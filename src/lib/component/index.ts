export { default as PagePagination } from './PagePagination.svelte';
export { default as Boundary } from './Boundary.svelte';

// Form
export { default as Form } from './Form.svelte';
export { default as Button } from './Button.svelte';

// Input
import { default as InputComponent } from './form/input/Input.svelte';
import { default as InputDropdownContainer } from './form/input/dropdown/Container.svelte';
import { default as InputDropdownOption } from './form/input/dropdown/Option.svelte';
import { default as InputDropdownValue } from './form/input/dropdown/Value.svelte';

export const Input = Object.assign(InputComponent, {
	DropDown: Object.assign(InputDropdownContainer, {
		Option: InputDropdownOption,
		Value: InputDropdownValue
	})
});

import { default as SelectContainer } from './form/select/Select.svelte';
import { default as SelectOption } from './form/select/Option.svelte';

export const Select = {
	Container: SelectContainer,
	Option: SelectOption
};
