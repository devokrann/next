import { apiUrl } from "@/data/constants";
import { enumRequest } from "@/types/enums";
import { TagCreate, TagGet } from "@/types/models/tag";

export const getTags = async () => {
	try {
		const request = new Request(`${apiUrl}/tags`, {
			method: enumRequest.GET
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (get tags):", error);
	}
};

export const removeTags = async (tags: TagGet) => {
	try {
		const request = new Request(`${apiUrl}/tags`, {
			method: enumRequest.DELETE,
			body: JSON.stringify(tags)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (remove tags):", error);
	}
};

export const addTag = async (tag: TagCreate) => {
	try {
		const request = new Request(`${apiUrl}/tags/new-tag`, {
			method: enumRequest.POST,
			body: JSON.stringify(tag)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (add tag):", error);
	}
};

export const removeTag = async (tag: TagGet) => {
	try {
		const request = new Request(`${apiUrl}/tags/${tag.id}`, {
			method: enumRequest.DELETE,
			body: JSON.stringify(tag)
		});

		const response = await fetch(request);

		const res = await response.json();

		return res;
	} catch (error) {
		console.error("---> handler error - (remove tag):", error);
	}
};
