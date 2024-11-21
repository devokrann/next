"use client";

import React from "react";

import { Platform } from "@/types/enums";
import { getShareLink } from "@/utilities/helpers/link";
import { ActionIcon, ActionIconProps, Group } from "@mantine/core";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconBrandWhatsapp } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Share({ props, ...restProps }: { props: { postTitle: string } } & ActionIconProps) {
	const pathname = usePathname();

	return (
		<Group gap={"xs"}>
			{shareLinks.map((link) => (
				<ActionIcon
					key={link.title}
					size={24}
					component={"a"}
					href={getShareLink(link.title, pathname, props.postTitle)}
					target="_blank"
					rel="noopener noreferrer"
					{...restProps}
				>
					<link.icon size={16} stroke={1.5} />
				</ActionIcon>
			))}
		</Group>
	);
}

const shareLinks = [
	{
		icon: IconBrandTwitter,
		title: Platform.TWITTER,
	},
	{
		icon: IconBrandFacebook,
		title: Platform.FACEBOOK,
	},
	{
		icon: IconBrandLinkedin,
		title: Platform.LINKEDIN,
	},
	{
		icon: IconBrandWhatsapp,
		title: Platform.WHATSAPP,
	},
];
