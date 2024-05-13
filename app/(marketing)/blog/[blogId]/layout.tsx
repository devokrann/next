import React from "react";

import LayoutBody from "@/layouts/Body";

export interface typeParams {
	params: { blogId: string };
}

export default function BlogDetails({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
