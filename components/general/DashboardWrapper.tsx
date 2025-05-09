// DashboardWrapper.tsx
"use client";

import { useSearchParams } from "next/navigation";
import DashboardPage from "./DashboardPage";

export default function DashboardWrapper() {
	const searchParams = useSearchParams();
	const clusterIdFromUrl = searchParams.get("clusterId") || "";

	return <DashboardPage clusterIdFromUrl={clusterIdFromUrl} />;
}
