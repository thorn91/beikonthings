import type { Actions } from './$types';
import { loginFromForm } from '$lib/actions/auth';

export const actions: Actions = {
    default: loginFromForm
};
