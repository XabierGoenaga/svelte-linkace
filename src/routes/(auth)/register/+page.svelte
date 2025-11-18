<script>
	import { Button, Form, Input } from '$lib/component';
	import { LockIcon } from '$lib/icon';
	import { createUser } from '$lib/remote';
	import { faker } from '@faker-js/faker';

	const createData = () => {
		createUser.fields.name.set(faker.person.fullName());
		createUser.fields.email.set(faker.internet.email());
		createUser.fields.password.set('password123');
		createUser.fields.confirmPassword.set('password123');
	};
</script>

<Form {...createUser}>
	<Input
		{...createUser.fields.name.as('text')}
		label="Full Name"
		placeholder="Your full name"
		autocomplete="name"
	/>

	{#each createUser.fields.name.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Input
		{...createUser.fields.email.as('email')}
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
		label="Password"
		placeholder="At least 8 characters"
		autocomplete="new-password"
	/>

	{#each createUser.fields.password.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Input
		{...createUser.fields.confirmPassword.as('password')}
		label="Confirm Password"
		placeholder="Re-enter your password"
		autocomplete="new-password"
	/>

	{#each createUser.fields.confirmPassword.issues() as error}
		<p style="color: red;">{error.message}</p>
	{/each}

	<Button type="submit" onclick={createData}>Create Account</Button>
	<Button type="button" onclick={createData}>Create Data</Button>
</Form>

<pre>{JSON.stringify(createUser.fields.allIssues(), null, 2)}</pre>
