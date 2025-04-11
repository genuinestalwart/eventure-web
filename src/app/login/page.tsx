"use client";
import Header from "@/components/shared/Header";
import PageLoader from "@/components/shared/PageLoader";
import useAuth from "@/hooks/useAuth";
import { Button, Card, Flex, Space, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [loggingIn, setLoggingIn] = useState<boolean>(false);
	const router = useRouter();
	const { loading, user } = useAuth();

	const handleClick = async () => {
		setDisabled(true);
		setLoggingIn(true);
		await signIn("google");
	};

	useEffect(() => {
		if (user && !loading) {
			router.replace("/events", { scroll: false });
		}
	}, [loading, router, user]);

	return loading || user ? (
		<PageLoader />
	) : (
		<>
			<Header />

			<Flex
				align='center'
				className='container min-h-[calc(100vh_-_5rem)]'
				component='main'
				justify='center'
				px='xl'>
				<Card
					className='rounded-xl sm:rounded-2xl'
					maw='50ch'
					shadow='xs'>
					<Title order={1} ta='center' style={{ color: "white" }}>
						Welcome Back, User!
					</Title>

					<Space h='lg' />

					<Button
						color={disabled ? "gray.7" : "primary.6"}
						disabled={disabled}
						loading={loggingIn}
						mx='md'
						onClick={() => handleClick()}
						size='md'
						variant='outline'>
						Log In with Google
					</Button>
				</Card>
			</Flex>
		</>
	);
};

export default page;
