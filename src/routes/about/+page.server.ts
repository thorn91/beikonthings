import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load = (async () => {

    return {
        test: 'test',
    };
}) satisfies PageServerLoad;