import { z } from "zod";

const envSchema = z.object({
    // envClient: z.object({
    // port: z.number().default(5173),
    // }),
    envServer: z.object({
        db: z.object({
            host: z.string().default("localhost"),
            port: z.number().default(5432),
            user: z.string().default("postgres"),
            password: z.string().default("postgres"),
            database: z.string().default("beikon"),
        }),
    }),
});

const envServer = envSchema.safeParse({
    envServer: {
        db: {
            host: process?.env?.POSTGRES_HOST ?? 'localhost',
            port: process?.env?.POSTGRES_PORT ?? 5432,
            user: process?.env?.POSTGRES_USER ?? 'postgres',
            password: process?.env?.POSTGRES_PASSWORD ?? 'postgres',
            database: process?.env?.POSTGRES_DB ?? 'beikon',
        },
    },
});

if (!envServer.success) {
    throw new Error(envServer.error.message);
}

export const env = envServer.data.envServer;