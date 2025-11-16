<script lang="ts">
	import { Button } from '$lib/component';

	type Props = {
		/** Current page number */
		page: number;
		/** Number of items per page */
		limit?: number;
		/** Total number of items */
		total?: number;
	};
	let { page = $bindable(1), limit = $bindable(10), total = $bindable(0) }: Props = $props();
</script>
