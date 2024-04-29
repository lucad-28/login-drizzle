import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "@/app/libs/db/db";
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzel/migrations" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
main();
