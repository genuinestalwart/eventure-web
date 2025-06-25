"use client";
import useAuth from "@/hooks/useAuth";
import { Button, Flex, Image, Space, Text, Title } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import NavDrawer from "@/components/NavDrawer";
import ConfirmModal from "@/components/modals/ConfirmModal";

const Header = () => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [loggingOut, setLoggingOut] = useState<boolean>(false);
	const [opened, setOpened] = useState<boolean>(false);
	const { loading, user } = useAuth();

	const handleConfirm = async () => {
		setOpened(false);
		setDisabled(true);
		setLoggingOut(true);
		await signOut();
	};

	const handleLogOut = () => {
		setOpened(true);
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
				{/* Shown on Desktop Screens */}
				<NavBar
					disabled={disabled}
					handleLogOut={handleLogOut}
					loading={loading}
					loggingOut={loggingOut}
					user={user}
				/>

				{/* Shown on Mobile Screens */}
				<NavDrawer
					disabled={disabled}
					handleLogOut={handleLogOut}
					loading={loading}
					loggingOut={loggingOut}
					user={user}
				/>

				{/* Logout Action */}
				<ConfirmModal
					confirm={
						<Button
							color='red'
							onClick={() => handleConfirm()}
							variant='filled'>
							Log Out
						</Button>
					}
					onClose={() => setOpened(false)}
					opened={opened}
					title={{
						color: "red.6",
						text: "Waiting for Confirmation",
					}}>
					<Text>Are you sure you want to log out?</Text>
					<Space h='lg' />
				</ConfirmModal>
			</Flex>
		</Flex>
	);
};

export default Header;
