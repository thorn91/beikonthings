import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || typeof email !== 'string') {
            console.error(`Invalid email: ${email}`);

            return fail(400, {
                message: 'Invalid email'
            });
        }
        if (!password || typeof password !== 'string') {
            console.error(`Invalid password: ${password}`);

            return fail(400, {
                message: 'Invalid password'
            });
        }

        const sanitizedEmail = email.toLocaleLowerCase().trim();

        try {
            // find user by key
            // and validate password
            const key = await auth.useKey('email', sanitizedEmail.toLowerCase(), password);
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            if (
                e instanceof LuciaError &&
                (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
            ) {
                // user does not exist
                // or invalid password
                return fail(400, {
                    message: 'Incorrect username or password'
                });
            }
            return fail(500, {
                message: 'An unknown error occurred'
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, '/');
    }
};
