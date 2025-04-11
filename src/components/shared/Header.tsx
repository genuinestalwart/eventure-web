"use client";
import useAuth from "@/hooks/useAuth";
import { Flex, Image, Text, Title } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useState } from "react";
import NavBar from "@/components/misc/NavBar";
import NavDrawer from "@/components/misc/NavDrawer";

const Header = () => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [loggingOut, setLoggingOut] = useState<boolean>(false);
	const { loading, user } = useAuth();

	const handleClick = async () => {
		setDisabled(true);
		setLoggingOut(true);
		await signOut();
	};

	return (
		<Flex
			align='center'
			className='h-20 px-8'
			component='header'
			justify='space-between'>
			<Flex align='center' gap='md'>
				<Image
					alt='Eventure Logo'
					className='h-12 w-12'
					src='/logo.png'
				/>

				<Title c='primary.6' component={Text} order={1}>
					Eventure
				</Title>
			</Flex>

			<Flex component='nav'>
				<NavBar
					disabled={disabled}
					handleClick={handleClick}
					loading={loading}
					loggingOut={loggingOut}
					user={user}
				/>

				<NavDrawer
					disabled={disabled}
					handleClick={handleClick}
					loading={loading}
					loggingOut={loggingOut}
					user={user}
				/>
			</Flex>
		</Flex>
	);
};

export default Header;
