import { CategoryCreate, CategoryGet } from "@/types/models/category";
import { enumRequest } from "@/types/enums";
import { baseUrl } from "@/data/constants";

const apiUrl = `${baseUrl}/api/categories`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getCategories = async () => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("X-> Error getting categories:", error);
	}
};

export const addCategory = async (category: CategoryCreate) => {
	try {
		const response = await fetch(`${apiUrl}/new-category`, {
			method: enumRequest.POST,
			body: JSON.stringify(category),
			headers,
		});

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("X-> Error adding category:", error);
	}
};

export const removeCategory = async (category: CategoryGet) => {
	try {
		const response = await fetch(`${apiUrl}/${category.id}`, {
			method: enumRequest.DELETE,
			body: JSON.stringify(category),
			headers,
		});

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("X-> Error removing category:", error);
	}
};
