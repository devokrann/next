import { IpInfo } from "@/types/ipInfo";

export const getLocationData = async (): Promise<IpInfo> => {
	try {
		const request = await fetch(
			`https://ipinfo.io/json?token=${process.env.NEXT_IP_INFO_TOKEN}`
		);

		const response = await request.json();

		return response;
	} catch (error) {
		console.error("---> service error - (get location data):", error);
		throw error;
	}
};

// {
// 	ip: "41.90.106.247",
// 	city: "Nairobi",
// 	region: "Nairobi County",
// 	country: "KE",
// 	loc: "-1.2833,36.8167",
// 	org: "AS37061 Safaricom Limited",
// 	timezone: "Africa/Nairobi",
// }
