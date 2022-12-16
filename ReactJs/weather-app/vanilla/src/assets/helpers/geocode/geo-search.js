export async function geoSearch(data) {
	const newData = data.replaceAll(" ", "");

	let request;
	let response;

	const url = `https://geocode.maps.co/search?q=${newData}`;

	try {
		request = await fetch(url);

		response = await request.json();

		return await response;
	} catch (err) {
		return err;
	}
}

export async function reverseGeoCode(data) {
	const { latitude, longitude } = data;

	const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

	try {
		const request = await fetch(url);

		const response = await request.json();

		return await response;
	} catch (err) {
		return err;
	}
}
