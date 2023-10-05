const axios = require('axios');

class Searches {
	historial = ['Tegucigalpa', 'Madrid', 'San José'];

	constructor() {
		//TODO: leer db si existe
	}

	get paramMapbox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 5,
			language: 'es',
		};
	}

	async city(place = '') {
		//petición http
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
				params: this.paramMapbox,
			});
			const resp = await instance.get();

			return resp.data.features.map((place) => ({
				id: place.id,
				name: place.place_name,
				center: place.center,
				lng: place.center[0],
				lat: place.center[1],
			})); // retornar los lugares que coincidan
		} catch (error) {
			return [];
		}
	}
}

module.exports = Searches;
