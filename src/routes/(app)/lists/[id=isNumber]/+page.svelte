<script lang="ts">
	import { addLinksToList, getLinks, getListsById } from '$lib/remote';
	import { page } from '$app/state';
	import { Button } from '$lib/component';

	const list = await getListsById(Number(page.params.id!));
	let linksToAdd: number[] = $state([]);

	console.log('list', list);
</script>

<h1 class="text-2xl font-bold mb-4">{list.name}</h1>
<p class="mb-2">ID: {list.id}</p>
<!-- <p class="mb-2">Description: {data.description}</p> -->
<p class="mb-2">Created At: {new Date(list.createdAt).toLocaleDateString()}</p>
<p class="mb-2">Updated At: {new Date(list.updatedAt).toLocaleDateString()}</p>

{#each list.linksToLists as { link }}
	<div class="border p-4 mb-2 rounded">
		<h2 class="text-xl font-semibold">{link.title}</h2>
		<p class="text-blue-600">
			<a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
		</p>
		{#if link.description}
			<p class="mt-2">{link.description}</p>
		{/if}
	</div>
{/each}

<select multiple bind:value={linksToAdd}>
	{#each await getLinks() as { id, title, url } (id)}
		<option value={id}>{title} - {url}</option>
	{/each}
</select>

<Button
	onclick={async () => {
		await addLinksToList({
			listId: list.id,
			ids: linksToAdd
		})
			.then(() => {
				alert('Links added to the list successfully!');
				linksToAdd = [];
			})
			.catch((err) => {
				console.error(err);
				alert('Failed to add links to the list.');
			});
	}}
>
	Add Selected Links to List
</Button>
