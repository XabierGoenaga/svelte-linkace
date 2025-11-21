<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div>{@render children()}</div>

<style>
	div {
		padding: 0.25rem 0.5rem;
		background-color: #334155;
		border-radius: 0.25rem;
	}
</style>
