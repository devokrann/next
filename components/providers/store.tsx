"use client";

import React, { useRef } from "react";

import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/libraries/redux/store";
import { updateColorScheme } from "@/libraries/redux/slices/color-scheme";

export default function Store({ colorScheme, children }: { colorScheme: string; children: React.ReactNode }) {
	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();

		// initialize
		storeRef.current.dispatch(updateColorScheme(colorScheme));
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
