import { Button, Flex, Modal, Text, Title } from "@mantine/core";

interface Props {
	children: React.ReactNode;
	confirm: React.ReactNode;
	onClose: Function;
	opened: boolean;
	title: { color: string; text: string };
}

const ConfirmModal: React.FC<Props> = ({
	children,
	confirm,
	onClose,
	opened,
	title,
}) => {
	return (
		<Modal
			centered
			onClose={() => onClose()}
			opened={opened}
			size='sm'
			title={
				<Title c={title.color} component={Text} order={2}>
					{title.text}
				</Title>
			}
			withCloseButton={false}>
			{children}

			<Flex align='center' gap='md' justify='end'>
				<Button
					color='gray.6'
					onClick={() => onClose()}
					variant='filled'>
					Cancel
				</Button>

				{confirm}
			</Flex>
		</Modal>
	);
};

export default ConfirmModal;
