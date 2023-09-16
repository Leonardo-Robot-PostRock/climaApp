const axios = require('axios');

class Searches {
	historial = ['Tegucigalpa', 'Madrid', 'San José'];

	constructor() {
		//TODO: leer db si existe
	}

	async ciudad(lugar = '') {
		//petición http
		// console.log('ciudad', lugar);
		try {
			const resp = await axios.get(
				'https://api.mapbox.com/geocoding/v5/mapbox.places/madr.json?proximity=ip&language=es&access_token=pk.eyJ1IjoibXJxd2VydHkiLCJhIjoiY2xtbDh5MzN4MDgxdTJrbndidXc4dDVqNyJ9.E_8Iwz8a3UiWzGGEDetqPg&limit=5'
			);
			console.log(resp.data);

			return []; // retornar los lugares que coincidan
		} catch (error) {
			return [];
		}
	}
}

module.exports = Searches;
