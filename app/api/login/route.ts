import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, userRole, roles, userAccess } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";

export async function POST(req: Request) {
	const { username, password } = await req.json();

	const foundUser = await db
		.select({
			id: users.id,
			name: users.name,
			username: users.username,
			password: users.password,
			roleId: roles.id,
			role: roles.description,
		})
		.from(users)
		.leftJoin(userRole, eq(users.id, userRole.userId))
		.leftJoin(roles, eq(userRole.roleId, roles.id))
		.where(ilike(users.username, username));

	if (!foundUser[0] || foundUser[0].password !== password) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	if (foundUser[0].role === "Watcher") {
		const foundAccess = await db
			.select()
			.from(userAccess)
			.where(eq(userAccess.userId, foundUser[0]?.id));

		if (!foundAccess[0]) {
			return NextResponse.json(
				{ error: "User access not found. You are not authorized." },
				{ status: 403 }
			);
		}
	}

	return NextResponse.json({ message: "Login successful", user: foundUser[0] });
}
