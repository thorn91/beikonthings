import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { registerFromForm } from '$lib/actions/auth';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth?.validate();

    if (session) throw redirect(302, '/');

    return {};
};

export const actions: Actions = {
    default: registerFromForm
};
