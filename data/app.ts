const companyName = "Brix";
const appName = companyName;

export const phones = {
	main: "(254) 123 456-789",
};

export const emails = {
	info: process.env.NEXT_EMAIL_INFO,
	noreply: process.env.NEXT_EMAIL_NOREPLY,
};

export const socials = {
	twitter: {
		platform: `Twitter`,
		link: "#",
	},
	facebook: {
		platform: `Facebook`,
		link: "#",
	},
	instagram: {
		platform: `Instagram`,
		link: "#",
	},
	linkedin: {
		platform: `LinkedIn`,
		link: "#",
	},
};

export const hours = {
	days: "Mon - Fri",
	times: "8 AM - 5 PM",
};

export const locations = {
	main: {
		location: "410 Terry Ave. North, Seattle, WA 98109",
		pin: "#",
	},
};

const appData = {
	name: { company: companyName, app: appName },
	phones,
	emails,
	socials,
	hours,
	locations,
};

export default appData;
