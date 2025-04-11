"use client";
import { ActionIcon, Button, Drawer, Loader, Stack } from "@mantine/core";
import NavLink from "@/components/shared/NavLink";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { User } from "@/types/global";
import { useHover } from "@mantine/hooks";

interface Props {
	disabled: boolean;
	handleClick: Function;
	loading: boolean;
	loggingOut: boolean;
	user: User | null;
}

const NavDrawer: React.FC<Props> = ({
	disabled,
	handleClick,
	loading,
	loggingOut,
	user,
}) => {
	const [opened, setOpened] = useState<boolean>(false);
	const { hovered, ref } = useHover();

	return (
		<>
			{loading ? (
				<Loader color='primary.6' hiddenFrom='xs' />
			) : (
				<ActionIcon
					aria-label='menu'
					color={hovered ? "secondary.3" : "primary.6"}
					hiddenFrom='xs'
					onClick={() => setOpened(true)}
					ref={ref}
					size='lg'
					variant='outline'>
					<IconMenu2 />
				</ActionIcon>
			)}

			<Drawer
				hiddenFrom='xs'
				onClose={() => setOpened(false)}
				opened={opened}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				size='sm'
				styles={{
					body: { flexGrow: 1 },
					content: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
					},
				}}>
				<Stack gap='sm' h='100%'>
					<NavLink path='/' text='Home' />

					{loading ? (
						<></>
					) : user ? (
						<>
							<NavLink path='/events' text='Events' />
							<NavLink path='/profile' text='Profile' />

							<Button
								color={disabled ? "gray.7" : "red.6"}
								disabled={disabled}
								loading={loggingOut}
								mt='auto'
								onClick={() => handleClick()}
								radius='md'
								rightSection={<IconLogout />}
								variant='filled'>
								Log Out
							</Button>
						</>
					) : (
						<NavLink path='/login' text='Login' />
					)}
				</Stack>
			</Drawer>
		</>
	);
};

export default NavDrawer;
