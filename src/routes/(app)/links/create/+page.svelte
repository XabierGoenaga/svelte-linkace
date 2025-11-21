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
	<Input fullWidth label="URL" {...createLink.fields.url.as('url')} required />
	<Input fullWidth label="Title" {...createLink.fields.title.as('text')} required />
	<Input fullWidth label="Description" {...createLink.fields.description.as('text')} />

	<Boundary>
		<Input
			{...createLink.fields.tags.as('text')}
			fullWidth
			label="Tags (comma separated)"
			bind:value={queryTags}
		>
			{#snippet dropdown({ id })}
				<Input.DropDown.Container {id}>
					{#each await tagsData as { id, name, owner } (id)}
						<Input.DropDown.Option onclick={() => handleTagClick(id)}>
							{owner.name}/{name}
						</Input.DropDown.Option>
					{/each}
				</Input.DropDown.Container>
			{/snippet}

			{#snippet dropdownValues()}
				{#each selectedTagsIds as id}
					{@const tag = (await tagsData).find((t) => t.id === id)}
					{#if tag}
						<Input.DropDown.Value>
							{tag.name}
						</Input.DropDown.Value>
					{/if}
				{/each}
			{/snippet}
		</Input>
	</Boundary>

	<Boundary>
		<Input
			{...createLink.fields.tags.as('text')}
			fullWidth
			label="Lists"
			bind:value={queryLists}
			icon={LockIcon}
		>
			{#snippet dropdown({ id })}
				<Input.DropDown.Container {id}>
					{#each await listsData as { id, name } (id)}
						<Input.DropDown.Option onclick={() => handleListClick(id)}>
							{name}
							<!-- {owner.name}/{name} -->
						</Input.DropDown.Option>
					{/each}
				</Input.DropDown.Container>
			{/snippet}

			{#snippet dropdownValues()}
				{#each selectedListsIds as id}
					{#if list}
						<Input.DropDown.Value>
							{@const list = (await listsData).find((l) => l.id === id)}
							{list.name}
						</Input.DropDown.Value>
					{/if}
				{/each}
			{/snippet}
		</Input>
	</Boundary>

	{#snippet footer()}
		<Button type="submit" disabled={!!createLink.pending}>Create Link</Button>
	{/snippet}
</Form>
