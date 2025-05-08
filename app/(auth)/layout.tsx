import { Navbar } from "@/components/general/Navbar";
import Providers from "../providers";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Navbar />
			<Providers>{children}</Providers>
		</div>
	);
}
