export default async function geoSearch(data) {
	const splitData = data.split(",");

	let response;

	if (splitData.length === 2 && Number(splitData[0]) && Number(splitData[1])) {
		const lat = Number(splitData[0]).toLowerCase().replaceAll(" ", "");
		const lon = Number(splitData[1]).toLowerCase().replaceAll(" ", "");
		const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;

		try {
			const request = await fetch(url);

			response = await request.json();
		} catch (err) {
			console.log(err);
		}
	} else if (splitData.length === 1) {
		const postalCode = splitData[0].toLowerCase().replaceAll(" ", "");
		console.log(postalCode);
		const url = `https://geocode.maps.co/search?postalcode=${postalCode}`;

		try {
			const request = await fetch(url);

			response = await request.json();

			console.log(response.length);
			if (response.length < 1) throw new Error();
		} catch (err) {
			console.log(err);
		}
	} else if (splitData.length === 2) {
		const city = splitData[0].toLowerCase().replaceAll(" ", "");
		const state = splitData[1].toLowerCase().replaceAll(" ", "");
		console.log(city, state);
		const url = `https://geocode.maps.co/search?city=${city}&state=${state}`;

		try {
			const request = await fetch(url);

			response = await request.json();
		} catch (err) {
			console.log(err);
		}
	}

	return response;
}
