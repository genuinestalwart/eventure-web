import { Box, GridCol, Image, Tooltip } from "@mantine/core";
import defaultUser from "@/assets/default-user.png";

interface Props {
	avatar: string | undefined;
	fullName: string;
}

const AccountAvatar: React.FC<Props> = ({ avatar, fullName }) => {
	return (
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
	);
};

export default AccountAvatar;
