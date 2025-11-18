<script lang="ts">
	import { Boundary } from '$lib/component';
	import { deleteListsById, getLists } from '$lib/remote';
</script>

<Boundary>
	{#await getLists() then lists}
		<div class="list-container">
			{#each lists as { id, name } (id)}
				<a class="list-item" href={`/lists/${id}`}>
					{name}
				</a>
				<a href={`/lists/${id}`}>Edit</a>
				<button onclick={() => deleteListsById(id)}>Delete</button>
			{/each}
		</div>
	{/await}
</Boundary>

<style>
	.list-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.list-item {
	}
</style>
