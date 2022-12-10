export function capitalize(words) {
	const totalWords = words.split(" ");
	let newWords = [];
	let newWord = "";

	for (let i = 0; i < totalWords.length; i++) {
		newWords.push(totalWords[i].replace(totalWords[i][0], totalWords[i][0].toUpperCase()));
	}

	newWord = newWords.join(" ");

	return newWord;
}
