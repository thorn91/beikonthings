import { env } from '$env/dynamic/public';
import { env as penv } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        test: 'test'
    };
}) satisfies PageServerLoad;
