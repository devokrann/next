import capitalize from "./capitalize";

const crumbify = (url: string) => {
	const crumbs = [{ link: "/", label: "Home" }];

	let currentLink = "";

	url.split("/")
		.filter(crumb => crumb != "")
		.map(item => {
			currentLink += `/${item}`;
			item.length < 24 &&
				crumbs.push({
					link: currentLink,
					label: `${capitalize.words(item.replaceAll("-", " "))}`,
				});
		});

	return crumbs;
};

export default crumbify;
