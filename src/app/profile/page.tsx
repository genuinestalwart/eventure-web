"use client";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types/global";
import {
	Box,
	Card,
	Divider,
	Flex,
	Grid,
	GridCol,
	Image,
	Space,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import GeneralInfo from "@/components/page-profile/GeneralInfo";
import DangerZone from "@/components/page-profile/DangerZone";
import defaultUser from "@/assets/default-user.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ProfilePage = () => {
	const { user, refetch } = useAuth();
	const { avatar, createdAt, email, fullName, uid } = user as User;

	return (
		<Flex
			align='center'
			className='container min-h-[calc(100vh_-_5rem)]'
			component='main'
			justify='center'
			px='xl'>
			<Card
				maw={{ base: "40ch", xs: "60ch" }}
				padding='xl'
				radius='lg'
				shadow='xl'
				w='100%'
				withBorder>
				<Title c='primary.6' order={1} ta='center'>
					My Profile
				</Title>

				<Space h='lg' />

				<Grid>
					{/* User Avatar */}
					<GridCol span={{ base: 12, xs: 4 }}>
						<Box
							className='bg-neutral border border-black'
							mx='auto'
							style={{ borderRadius: "50%" }}
							w={{ base: "50%", xs: "100%" }}>
							<Tooltip
								arrowSize={8}
								color='secondary.3'
								label='Your avatar is connected to your google account. Updating your google avatar will also change your avatar on Eventure.'
								multiline
								maw='20ch'
								withArrow>
								<Image
									alt={fullName}
									fallbackSrc={defaultUser.src}
									src={avatar}
									style={{ borderRadius: "50%" }}
									width='100%'
								/>
							</Tooltip>
						</Box>
					</GridCol>

					{/* General Info */}
					<GeneralInfo
						email={email}
						fullName={fullName}
						refetch={refetch}
						uid={uid}
					/>

					{/* Account Age */}
					<GridCol span={{ base: 12, xs: 6 }}>
						<Divider
							label={
								<Title c='secondary.3' order={2}>
									Account Age
								</Title>
							}
							labelPosition='center'
						/>

						<Space h='xs' />

						<Box className='bg-neutral p-2 rounded-md'>
							<Text>
								Created{" "}
								<Text fw={700} span>
									{dayjs.unix(createdAt).fromNow()}
								</Text>
							</Text>
						</Box>
					</GridCol>

					{/* Danger Zone */}
					<DangerZone uid={uid} />
				</Grid>
			</Card>
		</Flex>
	);
};

export default ProfilePage;
