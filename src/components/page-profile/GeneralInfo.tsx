"use client";
import { User } from "@/types/global";
import {
	ActionIcon,
	Button,
	Divider,
	Flex,
	GridCol,
	Loader,
	Space,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";

interface Props {
	email: string;
	fullName: string;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<User | null, Error>>;
	uid: string;
}

const GeneralInfo: React.FC<Props> = ({ email, fullName, refetch, uid }) => {
	const [newName, setNewName] = useState<string>(fullName);
	const [opened, setOpened] = useState<boolean>(false);
	const [updating, setUpdating] = useState<boolean>(false);
	const axiosSecure = useAxiosSecure();

	const handleConfirm = async () => {
		setOpened(false);
		setUpdating(true);

		try {
			await axiosSecure.patch("/user/update-name", { newName, uid });
			await refetch();
		} catch (error) {
			// do something
		}

		setUpdating(false);
	};

	return (
		<GridCol span={{ base: 12, xs: 8 }}>
			<Divider
				label={
					<Title c='secondary.3' order={2}>
						General Info
					</Title>
				}
				labelPosition='center'
			/>

			<Space h='xs' />

			<Flex
				align='center'
				className='bg-neutral p-2 rounded-md'
				gap='xs'
				justify='space-between'>
				<Text fw={700} w='80px'>
					Full Name:
				</Text>

				<Text className='grow truncate'>{fullName}</Text>

				{updating ? (
					<Loader color='primary.6' size='sm' />
				) : (
					<ActionIcon color='gray' onClick={() => setOpened(true)}>
						<IconEdit />
					</ActionIcon>
				)}
			</Flex>

			<Space h='xs' />

			<Flex
				align='center'
				className='bg-neutral p-2 rounded-md'
				gap='xs'
				justify='space-between'>
				<Text fw={700} w='80px'>
					Email:
				</Text>

				<Text className='grow truncate'>{email}</Text>
			</Flex>

			<ConfirmModal
				confirm={
					<Button
						color='primary.6'
						disabled={!newName.trim()}
						onClick={() => handleConfirm()}
						variant='outline'>
						Update
					</Button>
				}
				onClose={() => {
					setOpened(false);
					setNewName(fullName);
				}}
				opened={opened}
				title={{ color: "primary.6", text: "Edit Your Full Name" }}>
				<Text>Your name must be within 50 characters.</Text>

				<Space h='lg' />

				<TextInput
					data-autofocus
					onChange={({ currentTarget: { value } }) => {
						if (value.length < 51) {
							setNewName(value);
						}
					}}
					value={newName}
				/>

				<Space h='lg' />
			</ConfirmModal>
		</GridCol>
	);
};

export default GeneralInfo;
