import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { twoFactorClient } from 'better-auth/plugins';
import { passkeyClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: PUBLIC_BASE_URL,
	plugins: [twoFactorClient(), passkeyClient()]
});
