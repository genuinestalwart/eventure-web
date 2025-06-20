import { EventFormProps } from "@/types/global";
import { UseFormInput } from "@mantine/form";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

interface Props {
	formValues: EventFormProps;
	initialValues: EventFormProps;
	setFormValues: Dispatch<SetStateAction<EventFormProps>>;
}

export const eventFormData = ({
	formValues,
	initialValues,
	setFormValues,
}: Props) => {
	const form: UseFormInput<
		EventFormProps,
		(values: EventFormProps) => EventFormProps
	> = {
		initialValues,
		mode: "uncontrolled",
		onValuesChange: (values) => setFormValues(values),
		validate: {
			description: (v) =>
				v.trim().length < 2001
					? null
					: "Description must be within 100-2000 characters",
			endingAt: (v) =>
				dayjs(v).unix() > dayjs(formValues.startingAt).unix()
					? null
					: "Ending time must be bigger than starting time",
			startingAt: (v) =>
				dayjs(v).unix() > dayjs().unix()
					? null
					: "Starting time must be future time",
			title: (v) =>
				v.trim().length < 101
					? null
					: "Title must be within 10-100 characters",
			venueLink: (v) =>
				v.trim().startsWith("https://")
					? null
					: "That's not a valid link",
		},
	};

	return form;
};
