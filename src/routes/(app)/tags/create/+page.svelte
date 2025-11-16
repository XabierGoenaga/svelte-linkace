<script lang="ts">
	import { Input } from '$lib/component';
	import { createTag } from '$lib/remote';

	import { faker } from '@faker-js/faker';

	const createData = () => {
		createTag.fields.name.set(faker.lorem.word());
	};
</script>

<form {...createTag}>
	<Input {...createTag.fields.name.as('text')} label="Tag Name" required />

	<button type="submit">Create Tag</button>
</form>
