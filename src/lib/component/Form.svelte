<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { title: string; children: Snippet; footer: Snippet } & SvelteHTMLElements['form'];
	const { title, children, footer, ...restProps }: Props = $props();
</script>

<form {...restProps}>
	<header>
		<h2>{title}</h2>
	</header>
	<div class="content">
		{@render children()}
	</div>
	<footer>
		{@render footer()}
	</footer>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-radius: 0.75rem;
		background: linear-gradient(145deg, #1e293b, #0f172a);
		box-shadow:
			0 10px 25px rgba(0, 0, 0, 0.3),
			0 0 1px rgba(255, 255, 255, 0.1) inset;
		border: 1px solid rgba(255, 255, 255, 0.05);
		overflow: visible;
	}

	header {
		padding: 0.75rem;
		padding-left: 1.5rem;
		background: rgba(15, 23, 42, 0.5);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		border-top-left-radius: 0.75rem;
		border-top-right-radius: 0.75rem;
	}

	header h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		background: linear-gradient(135deg, #ffffff, #94a3b8);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
	}

	footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: rgba(11, 17, 31, 0.4);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		border-bottom-left-radius: 0.75rem;
		border-bottom-right-radius: 0.75rem;
	}
</style>
