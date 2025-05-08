import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasheet, userAccess } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
	const { userId, role } = await req.json();

	const fields = {
		barangay: datasheet.barangay,
		pollingPlace: datasheet.pollingPlace,
		cluster: datasheet.cluster,
		totalVoters: datasheet.totalVoters,
		isCast: datasheet.isCast,
		gusTambunting: datasheet.gusTambunting,
		brianYamsuan: datasheet.brianYamsuan,
		rodelEspinola: datasheet.rodelEspinola,
		florentinoBaguio: datasheet.florentinoBaguio,
		rolandoAguilar: datasheet.rolandoAguilar, // fixed here
	};

	let data;

	if (role === "Administrator") {
		data = await db.select(fields).from(datasheet);
	} else {
		data = await db
			.select(fields)
			.from(userAccess)
			.leftJoin(datasheet, eq(userAccess.clusterId, datasheet.cluster))
			.where(eq(userAccess.userId, userId));
	}

	return NextResponse.json(data);
}
