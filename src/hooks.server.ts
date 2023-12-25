import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const addAuth = () => (event.locals.auth = auth.handleRequest(event));

    addAuth();

    return await resolve(event);
};
