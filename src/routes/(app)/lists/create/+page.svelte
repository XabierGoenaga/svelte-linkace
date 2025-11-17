<script lang="ts">
	import { Form, Input } from '$lib/component';
	import { createLists } from '$lib/remote';
</script>

<Form {...createLists}>
	<Input label="Name" {...createLists.fields.name.as('text')} />

	<Button type="submit">Create</Button>
</Form>
