<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		<p>Loading...</p>
	{/snippet}

	{#snippet failed()}
		<p>Failed</p>
	{/snippet}

	{@render children()}
</svelte:boundary>
