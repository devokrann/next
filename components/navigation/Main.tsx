"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import Menu from "@/components/menus";

import data from "@/data";

import classes from "./Main.module.scss";

export default function Main() {
	const pathname = usePathname();

	return data.links.navbar.map(link => (
		<Menu.Navbar key={link.link} subLinks={link.subLinks}>
			{!link.subLinks ? (
				<Link href={link.link} className={`${classes.link} ${pathname == link.link ? classes.linkActive : ""}`}>
					{link.label}
				</Link>
			) : (
				<Link
					href={link.link}
					className={`${classes.link} ${
						pathname == link.link || link.subLinks.find(l => l.link == pathname) ? classes.linkActive : ""
					}`}
					// onClick={e => e.preventDefault()}
				>
					<Group gap={4}>
						<span>{link.label}</span>
						<IconChevronDown size={16} stroke={1.5} />
					</Group>
				</Link>
			)}
		</Menu.Navbar>
	));
}
