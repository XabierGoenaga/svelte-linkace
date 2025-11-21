<script lang="ts">
	import { useSearchParams } from 'runed/kit';
	import { object, optional, string } from 'valibot';

	import { Button, Form, Input, Select } from '$lib/component';
	import { createLists, getAllUsers } from '$lib/remote';

	let params = useSearchParams(object({ query: optional(string(), '') }), { updateURL: true });
</script>

<Form title="Create List" {...createLists}>
	<Input label="Name" {...createLists.fields.name.as('text')} />

	<Input label="Search Email" bind:value={params.query} placeholder="Search by email" />
	<!-- @wc-ignore -->
	<label for="Share">Selecciona el Usuario (Compartir)</label>
	<Select.Container id="Share" {...createLists.fields.sharedWithUserIds.as('select multiple')}>
		{#each await getAllUsers() as { id, name, email } (id)}
			<Select.Option value={id}>{name ?? email}</Select.Option>
		{/each}
	</Select.Container>

	{#snippet footer()}
		<Button type="submit">Create</Button>
	{/snippet}
</Form>
