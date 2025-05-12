"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { ComboBox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type UserProps = {
	id: number;
	lastName: string;
	firstName: string;
	username: string | null;
	password: string | null;
	roleId: number;
	role: string;
};

export default function Page() {
	const [cluster, setCluster] = useState("");
	const [token, setToken] = useState<UserProps>();

	useEffect(() => {
		const userToken = JSON.parse(localStorage.getItem("token") || "null");
		setToken(userToken);
	}, []);

	const { data = [], isLoading } = useQuery({
		queryKey: ["clusters"],
		enabled: !!token,
		queryFn: async () => {
			let data: { value: string; label: string }[] = [];

			const response = await fetch("/api/vote", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: token?.id, role: token?.role }), // Change this to the logged-in user ID and role
			});

			data = await response.json();

			return data;
		},
	});

	const handleChange = async (value: string) => {
		try {
			const response = await fetch("/api/watcher", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					clusterId: value,
				}),
			});

			const result = await response.json();

			if (result.error) {
				alert(result.error);
			} else {
			}
		} catch (error) {
			console.error("Error fetching datasheet:", error);
		}
	};
	return (
		<RequireAuth>
			<div className="flex items-start justify-center min-h-screen mt-10">
				<div className="w-full max-w-md bg-white shadow rounded">
					<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
						<h1 className="text-2xl font-bold mb-4">Manage Watchers</h1>

						<label className="block mb-2 font-semibold">Cluster Number:</label>
						<ComboBox
							options={data}
							value={cluster}
							onChange={(val) => {
								setCluster(val);
								handleChange(val);
							}}
							placeholder="Select cluster..."
						/>
					</div>
				</div>
			</div>
		</RequireAuth>
	);
}
