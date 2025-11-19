<script lang="ts">
	import { LinkAceIcon } from '$lib/icon';
	import type { LayoutProps } from './$types';

	const { children }: LayoutProps = $props();
</script>

<div role="banner">
	<header>
		<nav>
			<a class="navbar-brand" href="https://demo.linkace.org/dashboard">
				<LinkAceIcon />
			</a>
			<a href="/links">Links</a>
			<a href="/lists">Lists</a>
			<a href="/tags">Tags</a>
		</nav>

		<nav>
			<a href="/login">Login</a>
			<a href="/settings">Settings</a>
		</nav>
	</header>
</div>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	div[role='banner'] {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: var(--bs-blue);
	}

	header {
		width: 100%;
		max-width: 1400px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1rem;
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}

	main {
		width: 100%;
		max-width: 1400px;
		padding: 1rem 1rem;
		background-color: var(--bs-body-bg);
	}
</style>
