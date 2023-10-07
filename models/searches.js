const axios = require('axios');

class Searches {
	history = [];

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

	get paramOpenWeather() {
		return {
			appid: process.env.OPENWEATHER_KEY,
			lang: 'es',
			units: 'metric',
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

	async weatherPlace(lat, lon) {
		try {
			//instance axios.create
			const instance = axios.create({
				baseURL: `https://api.openweathermap.org/data/2.5/weather`,
				params: { lat, lon, ...this.paramOpenWeather },
			});
			//resp.data
			const resp = await instance.get();
			const { weather, main } = resp.data;

			return {
				desc: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp,
			};
		} catch (error) {
			console.log(error);
		}
	}

	async addHistory(place = '') {
		//TODO: prevenir duplicados
		if (this.history.includes(place.toLocaleLowerCase())) {
			return;
		}
		this.history.unshift(place.toLocaleLowerCase());

		//Grabar en DB
	}

	guardarDB() {}
}

module.exports = Searches;
