import { lucia, type UserSchema } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import db from './prisma';

export const auth = lucia({
    env: dev ? 'DEV' : 'PROD',
    middleware: sveltekit(),
    adapter: prisma(db),

    getUserAttributes: (databaseUser: UserSchema) => ({
        id: databaseUser.id
    })
});

export type Auth = typeof auth;
