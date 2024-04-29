import {
  unique,
  index,
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { table } from "console";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),
  },
  (table) => ({
    usernameIndex: index("username_index").on(table.username),
  })
);
