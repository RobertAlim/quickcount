"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

type User = {
	name: string;
};

export function Navbar() {
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const parsed = JSON.parse(token);
				setUser({ name: parsed.name });
				setRole(parsed.role);
			} catch (e) {
				console.error("Invalid user token");
			}
		}
	}, []);

	return (
		<nav className="flex items-center justify-between p-5  bg-gray-800 text-white">
			<div className="flex items-center gap-6">
				<Link href="/">
					<h1 className="text-3xl font-semibold">
						Quick<span className="text-green-500">Count</span>
					</h1>
				</Link>
				<div className="hidden sm:flex items-center gap-6">
					<Link
						href="/dashboard"
						className="text-sm font-medium hover:text-green-500 transition-colors"
					>
						Home
					</Link>
					<Link
						href="/watcher"
						className="text-sm font-medium hover:text-green-500 transition-colors"
					>
						Set Watcher
					</Link>
					{role !== "Watcher" ? (
						<Link
							href="/voting"
							className="text-sm font-medium hover:text-green-500 transition-colors"
						>
							Real-Time Voting
						</Link>
					) : (
						""
					)}
				</div>
			</div>{" "}
			<div className="flex items-center gap-4">
				<div className="items-center gap-4">
					{user ? `HELLO ${user.name}!` : "Welcome!"}
				</div>
				<LogoutButton />
			</div>
		</nav>
	);
}
