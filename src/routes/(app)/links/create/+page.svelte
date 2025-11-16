<script lang="ts">
	import { Form, Button, Input } from '$lib/component';
	import { createLink, getTags } from '$lib/remote';

	import { faker } from '@faker-js/faker';

	// const createData = () => {
	// 	createLink.fields.title.set(faker.lorem.words(3));
	// 	createLink.fields.url.set(faker.internet.url());
	// 	createLink.fields.description.set(faker.lorem.sentence());
	// 	// createLink.fields.tags.set(['1', '2']);
	// };
</script>

<Form {...createLink}>
	<Input label="Title" {...createLink.fields.title.as('text')} required />
	<Input label="URL" {...createLink.fields.url.as('url')} required />
	<Input label="Description" {...createLink.fields.description.as('text')} />
	<select {...createLink.fields.tags.as('select multiple')}>
		{#each (await getTags()) ?? [] as tag}
			<option value={String(tag.id)}>{tag.name}</option>
		{/each}
	</select>

	<Button type="submit">Create Link</Button>
</Form>

{#each createLink.fields.allIssues() as issue}
	<p style="color: red;">{issue.message}</p>
	<p style="color: red;">{issue.path}</p>
{/each}
