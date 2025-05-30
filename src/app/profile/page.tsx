"use client";
import Header from "@/components/shared/Header";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types/global";
import { Card, Flex, Grid, Space, Title } from "@mantine/core";
import AccountAvatar from "@/components/page-profile/AccountAvatar";
import AccountInfo from "@/components/page-profile/AccountInfo";
import AccountAge from "@/components/page-profile/AccountAge";
import AccountDelete from "@/components/page-profile/AccountDelete";

const ProfilePage = () => {
	const { user, refetch } = useAuth();
	const { avatar, createdAt, email, fullName, uid } = user as User;

	return (
		<>
			<Header />

			<Flex
				align='center'
				className='container min-h-[calc(100vh_-_5rem)]'
				component='main'
				justify='center'
				px='lg'>
				<Card
					maw={{ base: "40ch", xs: "60ch" }}
					padding='xl'
					radius='lg'
					shadow='xl'
					w='100%'
					withBorder>
					<Title c='primary.6' order={1} ta='center'>
						Your Profile
					</Title>

					<Space h='lg' />

					<Grid>
						<AccountAvatar avatar={avatar} fullName={fullName} />

						<AccountInfo
							email={email}
							fullName={fullName}
							refetch={refetch}
							uid={uid}
						/>

						<AccountAge createdAt={createdAt} />
						<AccountDelete uid={uid} />
					</Grid>
				</Card>
			</Flex>
		</>
	);
};

export default ProfilePage;
