import RequireAuth from "@/components/auth/RequireAuth";

export default function RolesHomePage() {
	return (
		<RequireAuth>
			<main className="py-10">
				<h1 className="text-2xl font-semibold">Welcome to Roles page!</h1>
			</main>
		</RequireAuth>
	);
}
