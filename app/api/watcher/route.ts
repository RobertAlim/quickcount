import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasheet, userAccess, users } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

export async function POST(req: Request) {
	const { clusterId } = await req.json();

	try {
		// let data: { value: string; label: string }[] = [];
		let data = await db
			.select({
				users: users.name,
			})
			.from(userAccess)
			.innerJoin(users, eq(userAccess.userId, users.id))
			.where(eq(userAccess.clusterId, clusterId));

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching clusters:", error);
		return NextResponse.json(
			{ error: "Failed to fetch clusters" },
			{ status: 500 }
		);
	}
}
