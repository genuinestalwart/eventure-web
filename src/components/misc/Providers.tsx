"use client";
import { MantineProvider } from "@mantine/core";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<MantineProvider>{children}</MantineProvider>
		</>
	);
};

export default Providers;
