"use client";

import DataTable from "@/components/general/DataTable";
import DataTableTech from "@/components/general/DataTableTech";
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

type RowType = {
	barangay: string;
	pollingPlace: string;
	totalVoters: number;
	cluster: number;
	isCast: boolean;
	gusTambunting: number;
	brianYamsuan: number;
	rodelEspinola: number;
	florentinoBaguio: number;
	rolandoAguilar: number;
	totalVotesCast: number;
};

export default function Page() {
	const [token, setToken] = useState<UserProps>();

	useEffect(() => {
		const userToken = JSON.parse(localStorage.getItem("token") || "null");
		setToken(userToken);
	}, []);

	const { data = [], isLoading } = useQuery<RowType[]>({
		queryKey: ["votecast"],
		enabled: !!token,
		refetchInterval: 10000, // Poll every 10 seconds
		queryFn: async () => {
			const response = await fetch(`/api/technical`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: token?.id, role: token?.role }),
			});

			if (!response.ok) {
				console.error("Failed to fetch datasheet");
				return []; // fallback to empty array on error
			}

			const data: RowType[] = await response.json();
			return data ?? []; // ensure it always returns an array
		},
	});

	return token?.role === "Administrator" ? (
		<DataTable data={data} />
	) : (
		<DataTableTech
			data={data}
			role={token?.role as "Technical" | "Coordinator"}
		/>
	);
}
