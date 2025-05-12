import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasheet, userAccess } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
	const { userId, clusterId, role } = await req.json();

	const parsedUserId = Number(userId);
	const parsedClusterId = Number(clusterId);

	if (!userId || !clusterId) {
		return NextResponse.json(
			{ error: "Missing userId or clusterId " },
			{ status: 400 }
		);
	}

	const foundCluster =
		role === "Technical"
			? await db
					.select({
						isCast: datasheet.isCast,
						gusTambunting: datasheet.gusTambunting,
						brianYamsuan: datasheet.brianYamsuan,
						rodelEspinola: datasheet.rodelEspinola,
						florentinoBaguio: datasheet.florentinoBaguio,
						rolandoAguilar: datasheet.rolandoAguilar,
						totalVoters: datasheet.totalVoters,
					})
					.from(userAccess)
					.leftJoin(datasheet, eq(userAccess.clusterId, datasheet.cluster))
					.where(
						and(
							eq(userAccess.clusterId, parsedClusterId),
							eq(userAccess.userId, parsedUserId)
						)
					)
			: await db
					.select({
						isCast: datasheet.isCast,
						gusTambunting: datasheet.gusTambunting,
						brianYamsuan: datasheet.brianYamsuan,
						rodelEspinola: datasheet.rodelEspinola,
						florentinoBaguio: datasheet.florentinoBaguio,
						rolandoAguilar: datasheet.rolandoAguilar,
						totalVoters: datasheet.totalVoters,
					})
					.from(datasheet)
					.where(eq(datasheet.cluster, parsedClusterId));

	if (!foundCluster[0]) {
		return NextResponse.json(
			{ error: "Invalid cluster" + foundCluster[0] + " " + userId },
			{ status: 401 }
		);
	}

	return NextResponse.json({
		message: "Fetch cluster successful",
		cluster: foundCluster[0],
	});
}
