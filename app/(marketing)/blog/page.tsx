import React from "react";

import Link from "next/link";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

export default function Blog() {
	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				Blog page
			</LayoutSection>
		</LayoutPage>
	);
}
