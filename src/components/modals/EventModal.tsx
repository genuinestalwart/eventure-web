"use client";
import { EventFormProps } from "@/types/global";
import {
	Box,
	Button,
	Flex,
	Modal,
	Space,
	Text,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";

interface Props {
	disabled: boolean;
	form: UseFormReturnType<
		EventFormProps,
		(values: EventFormProps) => EventFormProps
	>;
	handleSubmit: (values: EventFormProps) => Promise<void>;
	isEmpty: boolean;
	newEvent: boolean;
	onClose: Function;
	opened: boolean;
	title: string;
}

const EventModal: React.FC<Props> = ({
	disabled,
	form,
	handleSubmit,
	isEmpty,
	newEvent,
	onClose,
	opened,
	title,
}) => {
	const startDate = new Date(
		new Date().setMinutes(new Date().getMinutes() + 5)
	);
	const endDate = new Date(
		new Date().setMinutes(new Date().getMinutes() + 10)
	);

	const dtpInput = [
		{ label: "Starting At", minDate: startDate, name: "startingAt" },
		{ label: "Ending At", minDate: endDate, name: "endingAt" },
	];

	return (
		<Modal
			centered
			closeOnClickOutside={false}
			onClose={() => onClose()}
			opened={opened}
			size='lg'
			title={
				<Title c='primary.6' component={Text} order={2}>
					{title}
				</Title>
			}
			withCloseButton={false}>
			<Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					label='Title'
					maxLength={100}
					minLength={10}
					required
					{...form.getInputProps("title")}
				/>

				<Space h='xs' />

				<Textarea
					autosize
					label='Description'
					maxLength={2000}
					minLength={100}
					minRows={8}
					required
					{...form.getInputProps("description")}
				/>

				<Space h='xs' />

				<Flex align='center' gap='md'>
					{dtpInput.map((item, i) => (
						<DateTimePicker
							clearable
							key={i}
							label={item.label}
							minDate={item.minDate}
							required
							timePickerProps={{
								format: "12h",
								popoverProps: { withinPortal: false },
								withDropdown: true,
							}}
							valueFormat='MMM D, YYYY hh:mm A'
							w='50%'
							{...form.getInputProps(item.name)}
						/>
					))}
				</Flex>

				<Space h='xs' />

				<TextInput
					label='Venue Link'
					placeholder='https://example.com'
					required
					{...form.getInputProps("venueLink")}
				/>

				<Space h='lg' />

				<Flex align='center' gap='md' justify='end'>
					<Button
						color='gray.6'
						onClick={() => onClose()}
						variant='filled'>
						Cancel
					</Button>

					<Button
						color='primary.6'
						disabled={disabled || isEmpty}
						loading={disabled}
						type='submit'
						variant='outline'>
						{newEvent ? "Publish" : "Update"}
					</Button>
				</Flex>
			</Box>
		</Modal>
	);
};

export default EventModal;
