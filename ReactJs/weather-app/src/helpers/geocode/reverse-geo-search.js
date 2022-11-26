export default async function reverseGeoSearch(data) {
	const newData = data.split(",");

	if (Number(newData[0])) {
		const lat = Number(newData[0]);
		const lon = Number(newData[1]);
		const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;

		try {
			const request = await fetch(url);

			const response = request.json();

			return response;
		} catch (err) {
			console.log(err);
		}
	}
}
