<script lang="ts">
	import { LockIcon } from '$lib/icon';
	import type { Component } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		label?: string;
		icon?: Component;
	} & SvelteHTMLElements['input'];

	let id = $props.id();
	let { label, value = $bindable(), icon: Icon, ...data }: Props = $props();
</script>

<div class="input-wrapper">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-container">
		{#if Icon}
			<div class="icon-wrapper">
				<Icon />
			</div>
		{/if}
		<input class:with-icon={Icon} class:without-icon={!Icon} {id} bind:value {...data} />
	</div>
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.input-container {
		display: flex;

		& input {
			border: 1px solid var(--bs-border-color);
			border-left: 0px;
			background-color: var(--bs-light);
		}

		& input:focus {
			border: 1px solid var(--bs-border-color);
			border-left: 0px;
			background-color: var(--bs-light);
		}
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--bs-border-color);
		border-right: 0px;
		background-color: var(--bs-light);
	}
</style>
