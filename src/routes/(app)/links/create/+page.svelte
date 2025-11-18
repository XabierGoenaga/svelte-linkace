<script lang="ts">
	import { Form, Button, Input, Select, Boundary } from '$lib/component';
	import { createLink, getTagByName, getTags } from '$lib/remote';

	import { faker } from '@faker-js/faker';

	const createData = () => {
		createLink.fields.title.set(faker.lorem.words(3));
		createLink.fields.url.set(faker.internet.url());
		createLink.fields.description.set(faker.lorem.sentence());
		// createLink.fields.tags.set(['1', '2']);
	};

	let searchQuery: string = $state('');
	const searchedList = $derived(getTagByName(searchQuery));

	$inspect('Search Query:', searchedList);
</script>

<Form {...createLink}>
	<Input label="Title" {...createLink.fields.title.as('text')} required />
	<Input label="URL" {...createLink.fields.url.as('url')} required />
	<Input label="Description" {...createLink.fields.description.as('text')} />
	<Select.Container {...createLink.fields.tags.as('select multiple')}>
		{#each (await getTags()) ?? [] as tag}
			<Select.Option value={tag.id.toString()}>{tag.name}</Select.Option>
		{/each}
	</Select.Container>

	<Button type="submit" onclick={createData}>Create Link</Button>
</Form>

{#each createLink.fields.allIssues() as issue}
	<p style="color: red;">{issue.message}</p>
	<p style="color: red;">{issue.path}</p>
{/each}

<Boundary>
	<Input label="Search by tag name" bind:value={searchQuery} placeholder="Search by tag name" />

	{#each await searchedList as { id, name, owner } (id)}
		<p>{owner.name} - {name}</p>
	{/each}
</Boundary>
