<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { children: Snippet } & SvelteHTMLElements['option'];
	const { children, ...restProps }: Props = $props();
</script>

<option {...restProps}>
	{@render children()}
</option>
