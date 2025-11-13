<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { watch } from 'runed';

	type Props = { [key: string]: any };

	let id = $props.id();
	let { value = $bindable(), ...data }: Props = $props();

	let errors = $state<{ message: string }[]>([]);
	$effect.pre(() => {
		data;
		const numbers = Object.keys(data).filter((key) => !Number.isNaN(Number(key)));
		errors = numbers.map((key) => data[key]);

		untrack(() => {
			data = Object.fromEntries(Object.entries(data).filter(([key]) => isNaN(Number(key))));
		});
	});

	// watch.pre(
	// 	() => data,
	// 	() => {
	// 		const numbers = Object.keys(data).filter((key) => !Number.isNaN(Number(key)));
	// 		errors = numbers.map((key) => data[key]);

	// 		untrack(() => {
	// 			data = Object.fromEntries(Object.entries(data).filter(([key]) => isNaN(Number(key))));
	// 		});
	// 	}
	// );
</script>

<input type="text" {id} bind:value {...data} />

{#each errors as error}
	<pre class="error">{error.message}</pre>
{/each}

<pre>{JSON.stringify(errors, null, 2)}</pre>
