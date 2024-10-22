import { apiUrl } from "@/data/constants";
import { enumRequest } from "@/types/enums";
import { Contact } from "@/types/form";

export const sendInquiry = async (params: Contact) => {
	try {
		const request = new Request(`${apiUrl}/contact`, {
			method: enumRequest.POST,
			body: JSON.stringify(params)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (send inquiry):", error);
	}
};
