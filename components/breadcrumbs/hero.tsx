import React from "react";

import Link from "next/link";

import { Anchor, Breadcrumbs } from "@mantine/core";

import { IconChevronRight } from "@tabler/icons-react";

import classes from "./hero.module.scss";

import { typeLink } from "@/types/nav";

export default function Hero({ data }: { data: typeLink[] }) {
	const active = (breadcrumb: typeLink) => data.indexOf(breadcrumb) == data.length - 1;

	return (
		<Breadcrumbs separator={<IconChevronRight size={12} stroke={2} />}>
			{data.map(item => (
				<Anchor
					key={item.link}
					component={Link}
					href={item.link}
					c={active(item) ? "pri" : undefined}
					className={classes.link}
				>
					{item.label}
				</Anchor>
			))}
		</Breadcrumbs>
	);
}
