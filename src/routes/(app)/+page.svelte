<script>
	import { Form, Input } from '$lib/component';
	import { createUser } from '$lib/remote';
</script>

<Form {...createUser}>
	<Input
		{...createUser.fields.name.as('text')}
		label="Full Name"
		placeholder="Your full name"
		autocomplete="name"
	/>

	<Input
		{...createUser.fields.email.as('email')}
		label="Email"
		placeholder="you@example.com"
		autocomplete="email"
	/>

	<Input
		{...createUser.fields.password.as('password')}
		label="Password"
		placeholder="At least 8 characters"
		autocomplete="new-password"
	/>

	<Input
		{...createUser.fields.confirmPassword.as('password')}
		label="Confirm Password"
		placeholder="Re-enter your password"
		autocomplete="new-password"
	/>

	<button type="submit">Create Account</button>
</Form>
