<script lang="ts">
	import { Boundary, PagePagination } from '$lib/component';
	import { getLinks, getLinksCount, getFavoriteLinks } from '$lib/remote';
	import { onChangeNumber } from '$lib/utils';

	let pagination: PagePagination;
</script>

<PagePagination bind:this={pagination} total={await getLinksCount()} />

<label for="offset">Offset</label>
<select id="offset" onchange={(e) => (pagination.url.offset = onChangeNumber(e))}>
	<option value={10}>10</option>
	<option value={20}>20</option>
	<option value={50}>50</option>
</select>

<label for="limit">Limit</label>
<select id="limit" onchange={(e) => (pagination.url.limit = onChangeNumber(e))}>
	<option value={10}>10</option>
	<option value={20}>20</option>
	<option value={50}>50</option>
</select>

<header>
	<h3>Links</h3>

	<select name="filter" id="filter">
		<option value="">Oldest A-Z</option>
		<option value="">Newest A-Z</option>
		<option value="">URL A-Z</option>
		<option value="">URL Z-A</option>
		<option value="">Titulo A-Z</option>
		<option value="">Titulo Z-A</option>
	</select>
</header>

<section class="link-article">
	<Boundary>
		{#each await getLinks() as { id, title, description, url, favicon, createdAt, linksToTags } (id)}
			<article class="link-item">
				<header role="img">
					<img src="https://www.w3schools.com/favicon.ico" alt="favicon" loading="lazy" />
				</header>

				<div role="contentinfo">
					<div>
						<a href={url}>{title}</a>
						<a href={url}><small>{url}</small></a>
						<p>{description}</p>
					</div>

					<div role="complementary">
						<div role="list" aria-label="Etiquetas">
							{#each linksToTags as { tag } (tag.id)}
								<span class="tag">{tag.name}</span>
							{/each}
						</div>

						<small aria-label="Fecha de creación">
							Creado: {new Date(createdAt).toLocaleDateString('es-ES', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							})}
						</small>
					</div>
				</div>
			</article>
		{/each}
	</Boundary>
</section>

<style>
	h3 {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 1rem;
		color: #f1f5f9;
	}

	.link-article {
		display: flex;
		flex-direction: column;
		border-radius: 0.125rem;
		gap: 0rem;
		background-color: #0f172a;
	}

	.link-item {
		display: flex;
		flex-direction: row;
		padding: 0.5rem 0rem;
		padding-right: 0.5rem;
		border-bottom: 1px solid #64748b;

		& header[role='img'] {
			display: flex;
			align-items: start;
			justify-content: center;
			padding: 0.75rem;

			& img {
				width: 1rem;
				height: 1rem;
				object-fit: contain;
			}
		}

		& div[role='contentinfo'] {
			flex: 1;

			& div {
				display: flex;
				flex-direction: column;
				padding-top: 0.5rem;
			}

			& div[role='complementary'] {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				& div[role='list'] {
					display: flex;
					flex-direction: row;
					padding-top: 0.5rem;
					gap: 0.25rem;

					& span {
						background-color: #1e293b;
						font-size: 0.75rem;
						padding: 0.125rem 0.5rem;
						border-radius: 0.125rem;
						color: #f1f5f9;
					}
				}

				& small {
					color: #64748b;
					font-size: 0.75rem;
				}
			}

			& a {
				color: #f1f5f9;
				text-decoration: none;
				font-size: 1rem;
				font-weight: 500;

				& small {
					font-size: 0.875rem;
					color: #a1c6ea;
				}
			}

			& p {
				margin: 0px;
				font-size: 0.875rem;
				padding-bottom: 1rem;
			}
		}
	}
</style>
