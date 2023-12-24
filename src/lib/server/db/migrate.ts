import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from ".";

await migratePublicSchemaDown();

await migrate(db, {
    migrationsFolder: './src/lib/server/db/drizzle',
})

await pool.end();

async function migratePublicSchemaDown() {
    await pool.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO postgres;
        GRANT ALL ON SCHEMA public TO public;
    `);
}