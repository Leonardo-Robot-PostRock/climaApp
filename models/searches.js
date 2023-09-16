const axios = require('axios');

class Searches {
	historial = ['Tegucigalpa', 'Madrid', 'San José'];

	constructor() {
		//TODO: leer db si existe
	}

	get paramMapbox() {
		return {
			access_token:
				'pk.eyJ1IjoibXJxd2VydHkiLCJhIjoiY2xtbDh5MzN4MDgxdTJrbndidXc4dDVqNyJ9.E_8Iwz8a3UiWzGGEDetqPg',
			limit: 5,
			language: 'es',
		};
	}

	async ciudad(lugar = '') {
		//petición http
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
				params: this.paramMapbox,
			});
			const resp = await instance.get();
			console.log(resp.data);

			return []; // retornar los lugares que coincidan
		} catch (error) {
			return [];
		}
	}
}

module.exports = Searches;
