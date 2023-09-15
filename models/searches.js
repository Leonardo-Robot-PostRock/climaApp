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
			const resp = await axios.get('https://reqres.in/api/users?page=2');
			console.log(resp.data);

			return []; // retornar los lugares que coincidan
		} catch (error) {
			return [];
		}
	}
}

module.exports = Searches;
