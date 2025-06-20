"use client";
import { ActionIcon, Avatar, Flex, Loader } from "@mantine/core";
import NavLink from "@/components/shared/NavLink";
import Link from "next/link";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useHover } from "@mantine/hooks";
import { User } from "@/types/global";

interface Props {
	disabled: boolean;
	handleLogOut: Function;
	loading: boolean;
	loggingOut: boolean;
	user: User | null;
}

const NavBar: React.FC<Props> = ({
	disabled,
	handleLogOut,
	loading,
	loggingOut,
	user,
}) => {
	const pathname = usePathname();
	const { hovered, ref } = useHover();

	return (
		<Flex align='center' gap='xl' visibleFrom='xs'>
			<NavLink path='/' text='Home' />

			{loading ? (
				<Loader color='primary.6' />
			) : user ? (
				<>
					<NavLink path='/events' text='Events' />

					<Link href='/profile' scroll={false}>
						<Avatar
							alt={user.fullName}
							classNames={{
								root: `ring-2 ${
									"/profile" === pathname
										? "ring-primary"
										: "ring-transparent hover:ring-secondary"
								}`,
							}}
							color={
								"/profile" === pathname
									? "primary.6"
									: hovered
									? "secondary.3"
									: "white"
							}
							radius='xl'
							ref={ref}
							src={user.avatar ? user.avatar : null}>
							<IconUserCircle />
						</Avatar>
					</Link>

					<ActionIcon
						aria-label='logout'
						color='red.6'
						disabled={disabled}
						loading={loggingOut}
						onClick={() => handleLogOut()}
						radius='sm'
						size='lg'
						variant='subtle'>
						<IconLogout />
					</ActionIcon>
				</>
			) : (
				<NavLink path='/login' text='Login' />
			)}
		</Flex>
	);
};

export default NavBar;
