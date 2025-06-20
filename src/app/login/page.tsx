"use client";
import PageLoader from "@/components/shared/PageLoader";
import useAuth from "@/hooks/useAuth";
import { Button, Card, Flex, Space, Text, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
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
		<Flex
			align='center'
			className='container min-h-[calc(100vh_-_5rem)]'
			component='main'
			justify='center'
			px='xl'>
			<Card className='rounded-xl sm:rounded-2xl' maw='40ch' shadow='xs'>
				<Title c='primary.6' order={1} ta='center'>
					Welcome Back, User!
				</Title>

				<Space h='lg' />

				<Text ta='center'>
					Since this project is hosted on Vercel, there is some server
					side issue from Vercel. So you may have to click{" "}
					<Text fw={800} span>
						Log In
					</Text>{" "}
					at least 5-10 times. Sorry for the inconvenience.
				</Text>

				<Space h='lg' />

				<Button
					color='primary.6'
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
	);
};

export default LoginPage;
