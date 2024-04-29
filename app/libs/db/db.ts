import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as schema from "../../../drizzel/schema";

const sqlite = new Database("drizzel/dev.db");

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
});
