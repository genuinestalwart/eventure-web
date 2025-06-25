import { Box, Flex, Text, ThemeIcon } from "@mantine/core";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";

const Footer = () => {
	return (
		<Box bg='gray.9'>
			<Flex
				align='center'
				component='footer'
				gap='xs'
				justify='center'
				px='xl'
				py='md'>
				<Text size='sm'>
					&copy; All rights reserved by{" "}
					<Text fw={700} span>
						Eventure {dayjs().year()}
					</Text>
				</Text>

				<Link
					href='https://github.com/genuinestalwart/eventure-web'
					target='__blank'>
					<ThemeIcon
						color='primary.6'
						radius='xl'
						size='lg'
						variant='light'>
						<IconBrandGithubFilled />
					</ThemeIcon>
				</Link>
			</Flex>
		</Box>
	);
};

export default Footer;
