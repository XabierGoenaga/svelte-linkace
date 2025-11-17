<script lang="ts">
	import { useSearchParams } from 'runed/kit';
	import { PaginationDTO } from '$lib/dto';
	import { useFirstRender } from '$lib/hook';

	export const url = useSearchParams(PaginationDTO, { updateURL: true });
	const firstRender = useFirstRender();

	type Props = {
		/** Total number of items */
		total: number;
	};
	let { total = $bindable(0) }: Props = $props();

	const pagesShow = $derived.by(() => {
		const pagesShow: number[] = [];
		const limitShowPages: number = 5;

		let startPage = Math.max(url.page - Math.floor(limitShowPages / 2), 1);
		let endPage = startPage + limitShowPages - 1;

		if (endPage > Math.ceil(total / url.limit)) {
			endPage = Math.ceil(total / url.limit);
			startPage = Math.max(endPage - limitShowPages + 1, 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pagesShow.push(i);
		}

		return pagesShow;
	});
</script>

{#each pagesShow as page}
	<button
		aria-current={page === url.page ? 'page' : undefined}
		disabled={page === url.page}
		onclick={() => (url.page = page)}
	>
		{page}
	</button>
{/each}
