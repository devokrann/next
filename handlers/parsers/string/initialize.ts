import capitalize from "./capitalize";
import crumbify from "./crumbify";

const initialize = (words: string) =>
	words
		.split(" ")
		.map(word => word.charAt(0).toUpperCase())
		.join("");

const string = { capitalize, crumbify, initialize };

export default initialize;
