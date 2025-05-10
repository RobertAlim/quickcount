// app/dashboard/DashboardPage.tsx
"use client";
import RequireAuth from "@/components/auth/RequireAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ComboBox } from "@/components/ui/combobox";
import { boolean } from "drizzle-orm/gel-core";

type UserProps = {
	id: number;
	lastName: string;
	firstName: string;
	username: string | null;
	password: string | null;
	roleId: number;
	role: string;
};

interface Props {
	clusterIdFromUrl: string;
}

export default function DashboardPage({ clusterIdFromUrl }: Props) {
	const [cluster, setCluster] = useState("");
	const [isCast, setIsCast] = useState(false);
	const [votes, setVotes] = useState({
		gusTambunting: 0,
		brianYamsuan: 0,
		rodelEspinola: 0,
		florentinoBaguio: 0,
		rolandoAguilar: 0,
	});
	const [token, setToken] = useState<UserProps>();

	useEffect(() => {
		const userToken = JSON.parse(localStorage.getItem("token") || "null");
		setToken(userToken);
	}, []);

	useEffect(() => {
		if (clusterIdFromUrl && token?.id) {
			setCluster(clusterIdFromUrl); // Set the cluster state from the URL

			handleVoteChange(clusterIdFromUrl); // Fetch the datasheet for the cluster
		}
	}, [clusterIdFromUrl, token]); // Update token when clusterId changes

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

	const mutation = useMutation({
		mutationFn: async () => {
			const response = await fetch("/api/cast-vote", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: token?.id, // Change this to the logged-in user ID
					clusterId: parseInt(cluster),
					votes,
				}),
			});

			const result = await response.json();

			if (result.error) throw new Error("Failed to submit vote");

			return result;
		},
		onSuccess: () => {
			alert("Vote submitted successfully!");
		},
		onError: (err: any) => {
			alert(err.message || "Error casting vote.");
		},
	});

	const handleVoteChange = async (value: string) => {
		try {
			const response = await fetch("/api/datasheet", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: token?.id, clusterId: value }),
			});

			const result = await response.json();

			if (result.error) {
				// alert(result.error);
			} else {
				setIsCast(result.cluster.isCast);
				setVotes({
					gusTambunting: result.cluster.gusTambunting,
					brianYamsuan: result.cluster.brianYamsuan,
					rodelEspinola: result.cluster.rodelEspinola,
					florentinoBaguio: result.cluster.florentinoBaguio,
					rolandoAguilar: result.cluster.rolandoAguilar,
				});
			}
		} catch (error) {
			console.error("Error fetching datasheet:", error);
		}
	};

	return (
		<RequireAuth>
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-full max-w-md p-6 bg-white shadow rounded">
					<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
						<h1 className="text-2xl font-bold mb-4">Cast Your Vote</h1>

						<label className="block mb-2">Cluster Number:</label>
						<ComboBox
							options={data}
							value={cluster}
							onChange={(val) => {
								setCluster(val);
								handleVoteChange(val);
							}}
							placeholder="Select cluster..."
						/>

						<fieldset disabled={token?.role === "Watcher" && isCast}>
							<h2 className="text-lg font-semibold mb-2">Candidates</h2>
							<label className="block">Gus Tambunting:</label>
							<input
								type="number"
								value={votes.gusTambunting}
								onChange={(e) =>
									setVotes({
										...votes,
										gusTambunting: parseInt(e.target.value),
									})
								}
								className={`w-full border rounded p-2 mb-4 ${
									token?.role === "Watcher" && isCast ? "bg-gray-200" : ""
								}`}
							/>

							<label className="block">Brian Yamsuan:</label>
							<input
								type="number"
								value={votes.brianYamsuan}
								onChange={(e) =>
									setVotes({
										...votes,
										brianYamsuan: parseInt(e.target.value),
									})
								}
								className={`w-full border rounded p-2 mb-4 ${
									token?.role === "Watcher" && isCast ? "bg-gray-200" : ""
								}`}
							/>

							<label className="block">Rodel Espinola:</label>
							<input
								type="number"
								value={votes.rodelEspinola}
								onChange={(e) =>
									setVotes({
										...votes,
										rodelEspinola: parseInt(e.target.value),
									})
								}
								className={`w-full border rounded p-2 mb-4 ${
									token?.role === "Watcher" && isCast ? "bg-gray-200" : ""
								}`}
							/>

							<label className="block">Florentino Baguio:</label>
							<input
								type="number"
								value={votes.florentinoBaguio}
								onChange={(e) =>
									setVotes({
										...votes,
										florentinoBaguio: parseInt(e.target.value),
									})
								}
								className={`w-full border rounded p-2 mb-4 ${
									token?.role === "Watcher" && isCast ? "bg-gray-200" : ""
								}`}
							/>

							<label className="block">Rolando Aguilar:</label>
							<input
								type="number"
								value={votes.rolandoAguilar}
								onChange={(e) =>
									setVotes({
										...votes,
										rolandoAguilar: parseInt(e.target.value),
									})
								}
								className={`w-full border rounded p-2 mb-4 ${
									token?.role === "Watcher" && isCast ? "bg-gray-200" : ""
								}`}
							/>

							<button
								onClick={() => mutation.mutate()}
								disabled={mutation.isPending}
								className={`w-full p-2 rounded text-white ${
									token?.role === "Watcher" && isCast
										? "bg-gray-500"
										: "bg-green-600 hover:bg-green-700"
								}   ${
									mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
								}`}
							>
								{mutation.isPending ? "Submitting..." : "Cast Vote"}
							</button>
						</fieldset>
					</div>
				</div>
			</div>
		</RequireAuth>
	);
}
