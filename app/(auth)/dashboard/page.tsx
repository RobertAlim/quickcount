import { Suspense } from "react";
import DashboardWrapper from "@/components/general/DashboardWrapper";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading dashboard...</div>}>
			<DashboardWrapper />
		</Suspense>
	);
}
