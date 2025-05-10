import { db } from "@/db"; // adjust path if different
import { datasheet } from "@/db/schema"; // adjust based on your structure
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId, clusterId, noOfVoters, votes } = await req.json();

		if (!userId || !clusterId || !votes) {
			return NextResponse.json({ error: "Missing data" }, { status: 400 });
		}

		if (
			votes.gusTambunting +
				votes.brianYamsuan +
				votes.rodelEspinola +
				votes.florentinoBaguio +
				votes.rolandoAguilar >
			noOfVoters
		) {
			return NextResponse.json(
				{
					error: "Votes exceed the number of voters",
				},
				{ status: 400 }
			);
		}

		const result = await db
			.update(datasheet)
			.set({
				gusTambunting: votes.gusTambunting,
				brianYamsuan: votes.brianYamsuan,
				rodelEspinola: votes.rodelEspinola,
				florentinoBaguio: votes.florentinoBaguio,
				rolandoAguilar: votes.rolandoAguilar,
				isCast: true,
			})
			.where(eq(datasheet.cluster, clusterId))
			.returning();

		if (result.length === 0) {
			return NextResponse.json(
				{
					error: "Cluster not found or unauthorized -> " + userId,
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Vote cast successfully",
			updated: result[0],
		});
	} catch (error) {
		console.error("Cast vote error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
