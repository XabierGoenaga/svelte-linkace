<script lang="ts">
	import { Boundary } from '$lib/component';
	import { getLists } from '$lib/remote';
</script>

<Boundary>
	{#await getLists() then lists}
		<div class="list-container">
			{#each lists as { id, name } (id)}
				<a class="list-item" href={`/lists/${id}`}>
					{name}
				</a>
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
