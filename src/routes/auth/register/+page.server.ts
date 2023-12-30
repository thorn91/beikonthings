import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth?.validate();

    if (session) throw redirect(302, '/');

    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || typeof email !== 'string') {
            console.error(`Invalid username: ${email}`);

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

        const sanitizedEmail = email.toLocaleLowerCase();

        try {
            const user = await auth.createUser({
                key: {
                    providerId: 'email',
                    providerUserId: sanitizedEmail,
                    password
                },
                attributes: {
                    email: sanitizedEmail
                }
            });

            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            });

            console.log(locals);

            locals.auth.setSession(session);
        } catch (e) {
            console.error(e);

            return fail(500, {
                message: 'An unknown error occurred'
            });
        }

        throw redirect(302, '/');
    }
};
