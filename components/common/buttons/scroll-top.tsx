import { iconStrokeWidth } from "@/data/constants";
import { ActionIcon } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import React, { MouseEventHandler } from "react";

export default function ScrollTop({
	onClick
}: {
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<ActionIcon size={28} onClick={onClick}>
			<IconArrowUp size={20} stroke={iconStrokeWidth} />
		</ActionIcon>
	);
}
