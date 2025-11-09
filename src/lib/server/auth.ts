import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { twoFactor } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';

import { db } from '$lib/server/db/connection';
import * as schema from '$lib/server/db/schema';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const auth = betterAuth({
	appName: 'My App',
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [sveltekitCookies(getRequestEvent), twoFactor(), passkey()]
});
