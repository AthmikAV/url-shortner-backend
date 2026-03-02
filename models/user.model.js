import {text, pgTable, varchar,uuid, timestamp} from "drizzle-orm/pg-core"

const userTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),

    firstname: varchar('first_name', { length: 55 }).notNull(),
    lastname: varchar('last_name', { length: 55 }),

    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export default userTable;