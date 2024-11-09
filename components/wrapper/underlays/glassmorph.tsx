import React from "react";

import { Box } from "@mantine/core";

import classes from "./glassmorph.module.scss";

export default function Glassmorph({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<Box className={classes.root}>
			<div className={classes.underlay}></div>
			{children}
		</Box>
	);
}

// change this to paper component
