<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		fullWidth?: boolean;
		label?: string;
		icon?: Component;
		dropdown?: Snippet<[{ id: string }]>;
		// dropdownValues?: string[];
		dropdownValues?: Snippet;
		isDropdownOpen?: boolean;
	} & SvelteHTMLElements['input'];

	let id = $props.id();
	let { label, value = $bindable(), icon: Icon, dropdownValues, ...data }: Props = $props();
</script>

<div class="input-wrapper" class:full-width={data.fullWidth}>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-container-wrapper" class:full-width={data.fullWidth}>
		<div class="input-container" class:full-width={data.fullWidth}>
			{#if Icon}
				<div class="icon-wrapper">
					<Icon />
				</div>
			{/if}

			<input
				{id}
				class:full-width={data.fullWidth}
				class:with-icon={Icon}
				class:without-icon={!Icon}
				bind:value
				{...data}
			/>
		</div>
	</div>
</div>

<style>
	.input-wrapper {
		width: min-content;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		overflow: visible;
	}

	.input-container-wrapper {
		position: relative;
		width: min-content;
		overflow: visible;
	}

	.input-container {
		position: relative;

		width: min-content;
		display: flex;
		align-items: center;
		background-color: #1e293b;
		border: 1px solid #334155;
		border-radius: 0.375rem;

		& input {
			width: 100%;
			min-width: 0;
			flex: 1 1 0%;
			height: 100%;

			background-color: #1e293b;
			padding: 0.5rem 0.75rem;
			border-radius: 0.375rem;
			color: white;
			border: none;
			box-sizing: border-box;
		}

		& input:focus {
			outline: none;
			border: none;
		}

		.with-icon {
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}

		.without-icon {
			padding-left: 0.75rem;
		}
	}

	.full-width {
		width: 100%;
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px 12px;
		border-right: 1px solid #334155;

		border-top-left-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
	}
</style>
