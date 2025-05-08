import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasheet, userAccess, userRole } from "@/db/schema";
import { eq, sql, asc } from "drizzle-orm";

export async function POST(req: Request) {
	const { userId, role } = await req.json();

	try {
		let data: { value: string; label: string }[] = [];
		if (role === "Administrator") {
			data = await db
				.select({
					value: sql<string>`${datasheet.cluster}`,
					label: sql<string>`${datasheet.cluster} || ' ' || ${datasheet.pollingPlace}`,
				})
				.from(datasheet)
				.orderBy(asc(datasheet.cluster));
		} else {
			data = await db
				.select({
					value: sql<string>`${datasheet.cluster}`,
					label: sql<string>`${datasheet.cluster} || ' ' || ${datasheet.pollingPlace}`,
				})
				.from(datasheet)
				.leftJoin(userAccess, eq(datasheet.cluster, userAccess.clusterId))
				.leftJoin(userRole, eq(userAccess.userId, userRole.userId))
				.where(eq(userAccess.userId, Number(userId)))
				.orderBy(datasheet.cluster);
		}

		return NextResponse.json(
			data.map((cluster) => ({ value: cluster.value, label: cluster.label }))
		);
	} catch (error) {
		console.error("Error fetching clusters:", error);
		return NextResponse.json(
			{ error: "Failed to fetch clusters" },
			{ status: 500 }
		);
	}
}
