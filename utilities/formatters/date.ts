export const parseDateYmd = (dateStr: Date) => {
	const date = new Date(dateStr);

	// Format date as 'yy/mm.dd'
	const formattedDate = date.toLocaleDateString("en-GB", {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit"
	});

	const finalFormat = formattedDate.replace("/", "/").replace("/", ".");

	return finalFormat; // "24/09.16"
};
