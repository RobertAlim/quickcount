"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Redirect if already logged in
	useEffect(() => {
		const isLoggedIn = localStorage.getItem("token"); // or check cookie
		if (isLoggedIn) {
			router.push("/dashboard"); // or wherever your home is
		}
	}, [router]);

	const loginMutation = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			if (!res.ok) throw new Error("Login failed");
			return res.json();
		},
		onSuccess: (data) => {
			// console.log("Login successfuly:", data.user);
			localStorage.setItem("token", JSON.stringify(data.user)); // save session
			router.push("/dashboard"); // redirect to dashboard
		},
		onError: (err) => {
			alert("Invalid credentials");
		},
	});

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				className="bg-white p-6 rounded-xl shadow-md w-80"
				onSubmit={(e) => {
					e.preventDefault();
					loginMutation.mutate();
				}}
			>
				<h2 className="text-xl font-bold mb-4">Login</h2>
				<input
					type="username"
					className="w-full mb-3 p-2 border rounded"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					className="w-full mb-4 p-2 border rounded"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button variant={"default"}>
					{loginMutation.isPending ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
