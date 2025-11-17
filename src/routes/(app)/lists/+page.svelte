<script lang="ts">
	import { Boundary } from '$lib/component';
	import { getLists } from '$lib/remote';
</script>

<Boundary>
	{#each await getLists() as { id, name } (id)}
		<div class="p-4 border-b">
			<a href={`/lists/${id}`} class="text-lg font-medium text-blue-600 hover:underline">
				{name}
			</a>
		</div>
	{/each}
</Boundary>
