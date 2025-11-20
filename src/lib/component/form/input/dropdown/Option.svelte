<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = { children: Snippet } & HTMLButtonAttributes;
	const { children, onclick }: Props = $props();
</script>

<button type="button" class="dropdown-item" {onclick}>
	{@render children()}
</button>

<style>
	.dropdown-item {
		width: 100%;
		padding: 0.5rem 0.75rem;
		text-align: left;
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
	}

	.dropdown-item:hover {
		background-color: #334155;
	}

	.dropdown-item:focus {
		outline: none;
		background-color: #334155;
	}
</style>
