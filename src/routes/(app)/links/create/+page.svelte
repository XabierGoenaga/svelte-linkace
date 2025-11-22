<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Form, Button, Input, Boundary } from '$lib/component';
	import { useSearch } from '$lib/hook';
	import { createLink, searchListByName, searchTagByName } from '$lib/remote';
	import { LockIcon } from '$lib/icon';

	let queryTags = $state<string>('');
	let queryLists = $state<string>('');

	const tagsData = $derived(searchTagByName(queryTags));
	const listsData = $derived(searchListByName(queryLists));

	const selectedTagsIds = new SvelteSet<number>();
	const selectedListsIds = new SvelteSet<number>();

	const handleTagClick = (id: number) => {
		if (selectedTagsIds.has(id)) {
			return selectedTagsIds.delete(id);
		}

		selectedTagsIds.add(id);
	};

	const handleListClick = (id: number) => {
		if (selectedListsIds.has(id)) {
			return selectedListsIds.delete(id);
		}

		selectedListsIds.add(id);
	};
</script>

<Form title="Create Link" novalidate {...createLink}>
	<Input icon={LockIcon} fullWidth label="URL" {...createLink.fields.url.as('url')} required />
	<Input icon={LockIcon} fullWidth label="Title" {...createLink.fields.title.as('text')} required />
	<Input
		icon={LockIcon}
		fullWidth
		label="Description"
		{...createLink.fields.description.as('text')}
	/>

	<Boundary>
		<Input.DropDown>
			{#snippet select()}
				<Input.DropDown.Option />
			{/snippet}

			{#snippet value()}
				<Input.DropDown.Value />
			{/snippet}
		</Input.DropDown>
	</Boundary>

	{#snippet footer()}
		<Button type="submit" disabled={!!createLink.pending}>Create Link</Button>
	{/snippet}
</Form>
