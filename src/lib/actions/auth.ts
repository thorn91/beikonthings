import { auth } from '$lib/server/lucia';
import { redirect, type Actions, type Action } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { fail } from '@sveltejs/kit';

export const logout: Action = async ({ locals }) => {
    const session = await locals.auth?.validate();
    if (!session) return fail(401);

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, '/');
};

export const loginFromForm: Action = async ({ request, locals }) => {
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
};

export const registerFromForm: Action = async ({ request, locals }) => {
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
};
