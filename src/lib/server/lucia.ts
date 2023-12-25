import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import db from './prisma';

export const auth = lucia({
    env: dev ? 'DEV' : 'PROD',
    middleware: sveltekit(),
    adapter: prisma(db)
});

export type Auth = typeof auth;
