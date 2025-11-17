<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { children: Snippet } & SvelteHTMLElements['select'];
	const { children, ...restProps }: Props = $props();
</script>

<select multiple {...restProps}>
	{@render children()}
</select>
