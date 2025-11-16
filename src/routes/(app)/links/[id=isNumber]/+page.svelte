<script lang="ts">
	import { page } from '$app/state';

	import { Boundary } from '$lib/component';
	import { getLinkById } from '$lib/remote';

	const link = await getLinkById(page.params.id!);
</script>

<Boundary>
	<h3>{link.title}</h3>
	<p>{link.description}</p>
	<a href={link.url} target="_blank" rel="noopener noreferrer">Visit Link</a>
</Boundary>
