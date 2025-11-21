<script lang="ts">
	import type { PageProps } from './$types';

	import { Button, Form, Input } from '$lib/component';
	import { LockIcon } from '$lib/icon';
	import { createUser } from '$lib/remote';
	import { dev } from '$app/environment';

	const { data }: PageProps = $props();

	const createData = () => {
		console.log('Setting data...', data);

		createUser.fields.name.set(data.name);
		createUser.fields.email.set(data.email);
		createUser.fields.password.set(data.password);
		createUser.fields.confirmPassword.set(data.confirmPassword);
	};
</script>

<Form title="Register" {...createUser}>
	<Input
		{...createUser.fields.name.as('text')}
		fullWidth
		label="Full Name"
		placeholder="Your full name"
		autocomplete="name"
	/>

	{#each createUser.fields.name.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Input
		{...createUser.fields.email.as('email')}
		fullWidth
		label="Email"
		placeholder="you@example.com"
		autocomplete="email"
		icon={LockIcon}
	/>

	{#each createUser.fields.email.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Input
		{...createUser.fields.password.as('password')}
		fullWidth
		label="Password"
		placeholder="At least 8 characters"
		autocomplete="new-password"
	/>

	{#each createUser.fields.password.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Input
		{...createUser.fields.confirmPassword.as('password')}
		fullWidth
		label="Confirm Password"
		placeholder="Re-enter your password"
		autocomplete="new-password"
	/>

	{#each createUser.fields.confirmPassword.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	{#snippet footer()}
		<Button type="submit">Create Account</Button>
		{#if dev}
			<Button type="button" onclick={createData}>Set Data</Button>
		{/if}
	{/snippet}
</Form>

<pre>{JSON.stringify(createUser.fields.allIssues(), null, 2)}</pre>
