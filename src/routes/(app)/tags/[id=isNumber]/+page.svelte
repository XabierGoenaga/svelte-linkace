<script lang="ts">
	import { page } from '$app/state';
	import { getTagById } from '$lib/remote';

	const tag = await getTagById(page.params.id!);
</script>

<pre>{JSON.stringify(tag, null, 2)}</pre>
