import { bigint, index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const user = pgTable(
    'user',
    {
        id: bigint('id', { mode: 'bigint' }).primaryKey(),
        email: varchar('email', { length: 100 }).notNull().unique(),
        firstName: varchar('first_name', { length: 253 }).notNull(),
        lastName: varchar('last_name', { length: 255 }).notNull(),
        password: varchar('password', { length: 255 }).notNull(),
        created_at: timestamp('created_at').default(sql`now()`),
        updated_at: timestamp('updated_at').default(sql`now()`),
    },
    (users) => ({
        emailIdx: index('email_idx').on(users.email)
    }));