<script lang="ts">
	import { useSearchParams } from 'runed/kit';

	import { Button, Form, Input, Select } from '$lib/component';
	import { createLists, getAllUsers } from '$lib/remote';
	import { object, optional, string } from 'valibot';

	let params = useSearchParams(object({ query: optional(string(), '') }), { updateURL: true });
</script>

<Form {...createLists}>
	<Input label="Name" {...createLists.fields.name.as('text')} />

	<Input label="Search Email" bind:value={params.query} placeholder="Search by email" />
	<Select.Container {...createLists.fields.sharedWithUserIds.as('select multiple')}>
		{#each await getAllUsers() as { id, name, email } (id)}
			<Select.Option value={id}>{name ?? email}</Select.Option>
		{/each}
	</Select.Container>

	<Button type="submit">Create</Button>
</Form>
