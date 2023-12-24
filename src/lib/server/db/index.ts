import { env } from "$lib/env/envserver";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from './schema';
import pg from "pg";

const dbEnvVars = env.db;

export const pool = new pg.Pool({
    host: dbEnvVars.host,
    port: dbEnvVars.port,
    user: dbEnvVars.user,
    password: dbEnvVars.password,
    database: dbEnvVars.database,
});

export const db = drizzle(pool, { schema });