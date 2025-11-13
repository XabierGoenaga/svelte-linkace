<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { children: Snippet } & SvelteHTMLElements['form'];
	const { children, ...restProps }: Props = $props();
</script>

<form {...restProps}>
	{@render children()}
</form>
