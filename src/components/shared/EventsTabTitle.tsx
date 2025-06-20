"use client";
import { TabsTab } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";

interface Props {
	activeTab: string | null;
	children: React.ReactNode;
	value: string;
}

const EventsTabTitle: React.FC<Props> = ({ activeTab, children, value }) => {
	const { hovered, ref } = useHover();

	return (
		<TabsTab
			bg={hovered ? "transparent" : "transparent"}
			c={
				activeTab === value
					? "primary.6"
					: hovered
					? "secondary.3"
					: "white"
			}
			ref={ref}
			value={value}>
			{children}
		</TabsTab>
	);
};

export default EventsTabTitle;
