<script lang="ts">
	import { Boundary } from '$lib/component';
	import { getLinks, getFavoriteLinks } from '$lib/remote';
</script>

<h3>Links</h3>

<section class="link-article">
	<Boundary>
		{#each await getLinks() as { id, title, description, url, favicon, createdAt } (id)}
			<article class="link-item">
				<header>
					<h4>
						{#if favicon}
							<img
								src={favicon}
								alt="favicon"
								width="16"
								height="16"
								style="vertical-align: middle; margin-right: 4px;"
							/>
						{/if}

						{title}
					</h4>
					<small>
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							title="Abrir enlace en nueva pestaña"
						>
							{url}
						</a>
					</small>
				</header>
				<div>{description}</div>
				<footer>
					<!-- <div class="tags">
							{#each tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div> -->

					<small>Creado: {new Date(createdAt).toLocaleString()}</small>
				</footer>
			</article>
		{/each}
	</Boundary>
</section>

<style>
	.link-article {
		display: flex;
		flex-direction: column;
		gap: 0rem;
	}

	.link-item {
		& header {
		}

		& footer {
			text-align: right;
		}

		background-color: #0f172a;
	}
</style>
