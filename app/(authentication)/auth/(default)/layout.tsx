import React from "react";

import LayoutBody from "@/components/layout/body";

export default function LayoutDefault({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
