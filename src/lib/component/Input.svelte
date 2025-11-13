<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		label: string;
	} & SvelteHTMLElements['input'];

	let id = $props.id();
	let { label, value = $bindable(), ...data }: Props = $props();
</script>

<div>
	<label for={id}>{label}</label>
	<input {id} bind:value {...data} />
</div>
