import { enumRequest } from "@/types/enums";
import { apiUrl } from "@/data/constants";
import { AccountDelete, AccountPassword } from "@/types/form";

export const deleteAccount = async (params: AccountDelete) => {
	try {
		const request = new Request(`${apiUrl}/account/delete`, {
			method: enumRequest.DELETE,
			body: JSON.stringify(params)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (delete account):", error);
	}
};

export const updateAccountPassword = async (params: AccountPassword) => {
	try {
		const request = new Request(`${apiUrl}/account/password`, {
			method: enumRequest.PUT,
			body: JSON.stringify(params)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (update account password):", error);
	}
};

export const updateAccountNotifications = async (params: any) => {
	try {
		const request = new Request(`${apiUrl}/account/notifications`, {
			method: enumRequest.PUT,
			body: JSON.stringify(params)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (update account notifications):", error);
	}
};
