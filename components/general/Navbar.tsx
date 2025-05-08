import Link from "next/link";
import LogoutButton from "./LogoutButton";

export function Navbar() {
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
						href="/roles"
						className="text-sm font-medium hover:text-green-500 transition-colors"
					>
						Roles and Access
					</Link>
					<Link
						href="/candidate"
						className="text-sm font-medium hover:text-green-500 transition-colors"
					>
						Candidates
					</Link>
					<Link
						href="/voting"
						className="text-sm font-medium hover:text-green-500 transition-colors"
					>
						Real-Time Voting
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<LogoutButton />
			</div>
		</nav>
	);
}
