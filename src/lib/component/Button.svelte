<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { children: Snippet } & SvelteHTMLElements['button'];
	const { children, ...restProps }: Props = $props();
</script>

<button {...restProps}>
	{@render children()}
</button>
