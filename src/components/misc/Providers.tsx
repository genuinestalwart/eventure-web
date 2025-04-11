"use client";
import { resolver, theme } from "@/lib/configs/mantine-ui";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
const client = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={client}>
				<MantineProvider
					cssVariablesResolver={resolver}
					defaultColorScheme='dark'
					theme={theme}>
					{children}
				</MantineProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
