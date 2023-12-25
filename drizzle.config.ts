import type { Config } from 'drizzle-kit';

export default {
    schema: './src/lib/server/db/schema.ts',
    out: './src/lib/server/db/drizzle',
    dbCredentials: {
        connectionString: 'postgres://postgres:postgres@localhost:5432/beikon'
    },
    driver: 'pg'
} satisfies Config;
