import RequireAuth from "@/components/auth/RequireAuth";

export default function CandidatePage() {
	return (
		<RequireAuth>
			<main className="py-10">
				<h1 className="text-2xl font-semibold">Welcome to Candidate Page!</h1>
			</main>
		</RequireAuth>
	);
}
