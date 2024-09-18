const capitalize = {
	word: (word: string) => word.trim().toLowerCase().charAt(0).toUpperCase() + word.trim().toLowerCase().slice(1),
	words: (words: string) => words.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
};

export default capitalize;
