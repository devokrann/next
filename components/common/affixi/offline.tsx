"use client";

import React from "react";

import { Affix, AffixBaseProps, Alert } from "@mantine/core";

import WrapperTransition from "@/components/wrapper/transition";
import { IconWifi, IconWifiOff } from "@tabler/icons-react";
import { useNetwork } from "@mantine/hooks";

export default function Offline({
	position = {
		bottom: "var(--mantine-spacing-xl)",
		left: 0,
	},
	...restProps
}: { position?: AffixBaseProps["position"] } & Omit<AffixBaseProps, "position" | "children">) {
	const networkStatus = useNetwork();

	return (
		<Affix position={position} {...restProps}>
			<WrapperTransition transition={"slide-right"} mounted={!networkStatus.online} exitDelay={1000}>
				<Alert
					variant="light"
					color={networkStatus.online ? "green" : "red"}
					title={networkStatus.online ? "Online" : "Offline"}
					p={"xs"}
					style={{
						borderRadius: 0,
						borderTopRightRadius: "var(--mantine-radius-sm)",
						borderBottomRightRadius: "var(--mantine-radius-sm)",
					}}
					icon={
						networkStatus.online ? (
							<IconWifi size={16} stroke={1.5} />
						) : (
							<IconWifiOff size={16} stroke={1.5} />
						)
					}
				/>
			</WrapperTransition>
		</Affix>
	);
}
