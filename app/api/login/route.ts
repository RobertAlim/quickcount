import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, userRole, roles } from "@/db/schema";
import { eq } from "drizzle-orm";

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
		.where(eq(users.username, username));

	if (!foundUser[0] || foundUser[0].password !== password) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	return NextResponse.json({ message: "Login successful", user: foundUser[0] });
}
