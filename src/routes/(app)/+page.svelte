<script>
	import { Button, Form, Input } from '$lib/component';
	import { EmailIcon, LockIcon, UserIcon } from '$lib/icon';
	import { createUser } from '$lib/remote';
</script>

<Form title="Create Account" {...createUser}>
	<Input
		{...createUser.fields.name.as('text')}
		fullWidth
		label="Full Name"
		placeholder="Your full name"
		autocomplete="name"
		icon={UserIcon}
	/>

	<Input
		{...createUser.fields.email.as('email')}
		fullWidth
		label="Email"
		placeholder="you@example.com"
		autocomplete="email"
		icon={EmailIcon}
	/>

	<Input
		{...createUser.fields.password.as('password')}
		fullWidth
		label="Password"
		placeholder="At least 8 characters"
		autocomplete="new-password"
		icon={LockIcon}
	/>

	<Input
		{...createUser.fields.confirmPassword.as('password')}
		fullWidth
		label="Confirm Password"
		placeholder="Re-enter your password"
		autocomplete="new-password"
		icon={LockIcon}
	/>

	{#snippet footer()}
		<Button type="submit">Create Account</Button>
	{/snippet}
</Form>
