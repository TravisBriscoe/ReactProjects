export function removeNegative(temp) {
	let cToF = temp;

	if (cToF.toString().includes("-0")) cToF = Number(0);

	return cToF;
}

export function convertTemp(temp) {
	let cToF = temp * 1.8 + 32;

	const decimal = Number(cToF.toString().split(".")[1]);

	if (decimal > 5) cToF = Math.ceil(cToF);
	else cToF = Math.floor(cToF);

	return cToF;
}
