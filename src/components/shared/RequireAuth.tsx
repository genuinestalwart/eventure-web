"use client";
import useAuth from "@/hooks/useAuth";
import PageLoader from "@/components/shared/PageLoader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { loading, user } = useAuth();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login", { scroll: false });
		}
	}, [loading, router, user]);

	return loading || !user ? <PageLoader /> : <>{children}</>;
};

export default RequireAuth;
