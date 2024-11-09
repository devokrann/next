"use client";

import React from "react";

import Link from "next/link";

import { Group, Button, Divider, Anchor } from "@mantine/core";

import LayoutSection from "@/components/layout/section";
import DrawerNavbarMain from "@/components/common/drawers/navbar/main";
import MenuAvatar from "@/components/common/menus/avatar";
import MenuNavbar from "@/components/common/menus/navbar";
import LayoutBrand from "../brand";

import sample from "@/data/sample";

import { signIn } from "@/handlers/event/auth";
import { useSession } from "next-auth/react";
import links from "@/data/links";
import classes from "./main.module.scss";
import { usePathname } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import { iconStrokeWidth } from "@/data/constants";

export default function Main() {
	const { data: session } = useSession();

	const pathname = usePathname();

	const navLinks = links.navbar.map((link) => (
		<MenuNavbar key={link.link} subLinks={link.subLinks}>
			{!link.subLinks ? (
				<Anchor
					component={Link}
					href={link.link}
					className={`${classes.link} ${pathname == link.link ? classes.linkActive : ""}`}
				>
					{link.label}
				</Anchor>
			) : (
				<Anchor
					component={Link}
					href={link.link}
					className={`${classes.link} ${
						pathname == link.link || link.subLinks.find((l) => l.link == pathname) ? classes.linkActive : ""
					}`}
					// onClick={e => e.preventDefault()}
				>
					<Group gap={4}>
						<span>{link.label}</span>
						<IconChevronDown size={16} stroke={iconStrokeWidth} style={{ marginTop: 2 }} />
					</Group>
				</Anchor>
			)}
		</MenuNavbar>
	));

	return (
		<LayoutSection id={"partial-navbar-main"} shadowed padded="md">
			<Group justify="space-between">
				<Group align="end" gap={"lg"} visibleFrom="sm">
					<Link href={"/"}>
						<LayoutBrand />
					</Link>

					<Divider orientation="vertical" />

					<Group component={"nav"}>{navLinks}</Group>
				</Group>

				<Group visibleFrom="sm" gap={"xs"}>
					{!session?.user ? (
						<Button size="xs" variant="light" onClick={signIn}>
							Log In
						</Button>
					) : (
						<MenuAvatar />
					)}
				</Group>

				<Group hiddenFrom="sm" gap={"xs"} justify="space-between" w={"100%"}>
					<DrawerNavbarMain props={sample.links.navbar} />
					<MenuAvatar />
				</Group>
			</Group>
		</LayoutSection>
	);
}
