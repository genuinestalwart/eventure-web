"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ path, text }: { path: string; text: string }) => {
	const pathname = usePathname();

	return (
		<Link
			className={`font-medium py-2 rounded-lg text-center transition-all ${
				path === pathname
					? "bg-primary sm:bg-transparent text-black sm:text-primary"
					: "hover:bg-secondary sm:hover:bg-transparent text-white hover:text-black sm:hover:text-secondary sm:hover:underline underline-offset-2"
			}`}
			href={path}
			scroll={false}>
			{text}
		</Link>
	);
};

export default NavLink;
