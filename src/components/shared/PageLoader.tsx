import { Flex, Loader } from "@mantine/core";

const PageLoader = () => {
	return (
		<Flex align='center' h='100vh' justify='center' w='100%'>
			<Loader color='primary.6' />
		</Flex>
	);
};

export default PageLoader;
