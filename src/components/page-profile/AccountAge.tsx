import { Box, Divider, GridCol, Space, Text, Title } from "@mantine/core";
import moment from "moment";

const AccountAge = ({ createdAt }: { createdAt: number }) => {
	return (
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
						{moment.unix(createdAt).fromNow()}
					</Text>
				</Text>
			</Box>
		</GridCol>
	);
};

export default AccountAge;
