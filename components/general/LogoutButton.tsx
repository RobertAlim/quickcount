"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token"); // Clear session token
		router.push("/login"); // Redirect to login
	};

	return (
		<Button
			onClick={handleLogout}
			variant={"outline"}
			className="text-gray-700"
		>
			Logout
		</Button>
	);
}
