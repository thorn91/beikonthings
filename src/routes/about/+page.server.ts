import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        test: 'test'
    };
}) satisfies PageServerLoad;
