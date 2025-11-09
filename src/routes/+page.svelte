<script lang="ts">
	import { getAllUsers, createUser } from '$lib/remote';
</script>

<svelte:boundary>
	{#snippet failed()}
		<p>Error</p>
	{/snippet}

	{#snippet pending()}
		<p>Loading</p>
	{/snippet}

	{#each await getAllUsers({ offset: 0, limit: 2 }) as { id, name, email } (id)}
		<p>{id} - {name} - {email}</p>
	{/each}
</svelte:boundary>

<form {...createUser}>
	<label>
		Username:
		<input name="username" type="text" />
	</label>
	<br />
	<label>
		Email:
		<input name="email" type="email" />
	</label>
	<br />
	<label>
		Password:
		<input name="password" type="password" />
	</label>
	<br />
	<button type="submit">Create User</button>
</form>
