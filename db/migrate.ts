// drizzle/migrate.ts

import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "@/db"; // Adjust the import path as necessary

async function main() {
	try {
		await migrate(db, { migrationsFolder: "./db/migrations" });
		console.log("✅ Migration applied successfully.");
	} catch (err) {
		console.error("❌ Migration failed:", err);
		process.exit(1);
	}
}

main();
