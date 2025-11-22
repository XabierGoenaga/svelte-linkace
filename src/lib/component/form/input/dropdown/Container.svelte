<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = { select: Snippet; values: Snippet } & HTMLInputAttributes;
	const { select, values, ...restProps }: Props = $props();
</script>

<div>
	<div>
		{@render values()}
	</div>
	<input {...restProps} />
	<div>
		{@render select()}
	</div>
</div>
