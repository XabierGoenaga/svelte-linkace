<script lang="ts">
	import { Boundary, PagePagination } from '$lib/component';
	import { deleteLink, getLinks } from '$lib/remote';
	// import { onChangeNumber } from '$lib/utils';

	let pagination: PagePagination;
</script>

<!-- <PagePagination bind:this={pagination} total={await getLinksCount()} />

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
</select> -->

<header>
	<h3>Links</h3>

	<!-- <select name="filter" id="filter">
		<option value="">Oldest A-Z</option>
		<option value="">Newest A-Z</option>
		<option value="">URL A-Z</option>
		<option value="">URL Z-A</option>
		<option value="">Titulo A-Z</option>
		<option value="">Titulo Z-A</option>
	</select> -->
</header>

<section class="link-article">
	<Boundary>
		{#if (await getLinks()).length === 0}
			<div style="margin-left: 1rem">
				<p>No hay links para mostrar.</p>
			</div>
		{/if}

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
						{#if linksToTags.length != 0}
							<div role="list" aria-label="Etiquetas">
								{#each linksToTags as { tag } (tag.id)}
									<a class="tag" href={`/tags/${tag.id}`}>{tag.name}</a>
								{/each}
							</div>
						{:else}
							<div role="list" aria-label="Etiquetas">
								<span class="tag">Sin etiquetas</span>
							</div>
						{/if}

						<div class="actions-container">
							<a href={`/links/${id}`}><small>Show</small></a>
							<a href={`/links/${id}/edit`}><small>Edit</small></a>
							<button
								type="button"
								class="link-button no-underline"
								aria-label="Eliminar"
								on:click={() => deleteLink(id)}
							>
								<small>Delete</small>
							</button>
							<small aria-label="Fecha de creación">
								Creado: {new Date(createdAt).toLocaleDateString('es-ES', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								})}
							</small>
						</div>
					</div>
				</div>
			</article>
		{/each}
	</Boundary>
</section>

<style lang="postcss">
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
					justify-content: start;
					align-items: center;
					gap: 0.25rem;

					& span {
						background-color: #1e293b;
						font-size: 0.75rem;
						padding: 0.125rem 0.5rem;
						border-radius: 0.125rem;
						color: #f1f5f9;
					}
				}

				& .actions-container {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 0.5rem;

					& small {
						font-size: 0.75rem;
						color: #a1c6ea;
						cursor: pointer;
					}
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

	.link-button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: #a1c6ea;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}

	.link-button.no-underline {
		&:hover {
			text-decoration: none;
		}
	}
</style>
