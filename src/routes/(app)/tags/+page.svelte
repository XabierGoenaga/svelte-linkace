<script lang="ts">
	import { getTags } from '$lib/remote';
</script>

{#each await getTags() as { id, name } (id)}
	<div>{name}</div>
{/each}
