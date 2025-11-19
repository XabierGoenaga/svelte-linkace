<script lang="ts">
	import { Form, Button, Input, Boundary } from '$lib/component';
	import { createLink, searchTagByName } from '$lib/remote';

	// Search Tags
	let searchQuery: string = $state('');
	const searchedList = $derived(searchTagByName(searchQuery));
</script>

<Form title="Create Link" novalidate {...createLink}>
	<Input label="URL" {...createLink.fields.url.as('url')} required />
	<Input label="Title" {...createLink.fields.title.as('text')} required />
	<Input label="Description" {...createLink.fields.description.as('text')} />

	<Boundary>
		<Input
			label="Tags (comma separated)"
			{...createLink.fields.tags.as('email')}
			bind:value={searchQuery}
		>
			{#snippet dropdown()}
				<Input.DropDown.Container>
					{#each await searchedList as { id, name, owner } (id)}
						<Input.DropDown.Option value={id}>{owner.name}/{name}</Input.DropDown.Option>
					{/each}
				</Input.DropDown.Container>
			{/snippet}
		</Input>
	</Boundary>

	{#snippet footer()}
		<Button type="submit" disabled={!!createLink.pending}>Create Link</Button>
	{/snippet}
</Form>
