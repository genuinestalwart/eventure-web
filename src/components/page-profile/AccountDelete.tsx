"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
	Button,
	Divider,
	GridCol,
	Space,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface Props {
	uid: string;
}

const AccountDelete: React.FC<Props> = ({ uid }) => {
	const [opened, setOpened] = useState<boolean>(false);
	const [typedText, setTypedText] = useState<string>("");
	const axiosSecure = useAxiosSecure();

	const handleConfirm = async () => {
		await signOut();
		await axiosSecure.delete(`/user/${uid}`);
	};

	return (
		<GridCol span={{ base: 12, xs: 6 }}>
			<Divider
				label={
					<Title c='red.6' order={2}>
						Danger Zone
					</Title>
				}
				labelPosition='center'
			/>

			<Space h='xs' />

			<Button
				color='red'
				fullWidth
				onClick={() => setOpened(true)}
				variant='filled'>
				Delete Account
			</Button>

			<ConfirmModal
				confirm={
					<Button
						color='red.6'
						disabled={typedText !== "DELETE MY ACCOUNT"}
						onClick={() => handleConfirm()}
						variant='filled'>
						Delete
					</Button>
				}
				onClose={() => {
					setOpened(false);
					setTypedText("");
				}}
				opened={opened}
				setOpened={setOpened}
				title={{ color: "red.6", text: "Action Irreversible!" }}>
				<Text>
					Are you sure you want to delete your account? If yes, please
					type{" "}
					<Text fw={800} span>
						DELETE MY ACCOUNT
					</Text>{" "}
					below:
				</Text>

				<Space h='lg' />

				<TextInput
					data-autofocus
					onChange={(e) => setTypedText(e.currentTarget.value)}
					placeholder='DELETE MY ACCOUNT'
					value={typedText}
				/>

				<Space h='lg' />
			</ConfirmModal>
		</GridCol>
	);
};

export default AccountDelete;
