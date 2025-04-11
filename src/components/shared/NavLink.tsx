"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ path, text }: { path: string; text: string }) => {
	const pathname = usePathname();

	return (
		<Link
			className={`font-medium py-2 rounded-lg text-center transition-all ${
				path === pathname
					? "bg-primary md:bg-transparent text-black md:text-primary"
					: "hover:bg-secondary md:hover:bg-transparent text-white hover:text-black md:hover:text-secondary md:hover:underline underline-offset-2"
			}`}
			href={path}
			scroll={false}>
			{text}
		</Link>
	);
};

export default NavLink;
