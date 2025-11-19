<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		value: string | number;
		onclick?: (value: string | number) => void;
	};

	const { children, value, onclick }: Props = $props();

	function handleClick() {
		onclick?.(value);
	}
</script>

<button type="button" class="dropdown-item" onclick={handleClick}>
	{@render children?.()}
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
