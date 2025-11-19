<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		isOpen?: boolean;
	};

	const { children, isOpen = true }: Props = $props();
</script>

{#if isOpen}
	<div class="dropdown-container">
		{@render children()}
	</div>
{/if}

<style>
	.dropdown-container {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background-color: #1e293b;
		border: 1px solid #334155;
		border-radius: 0.375rem;
		max-height: 200px;
		overflow-y: auto;
		z-index: 300;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>
