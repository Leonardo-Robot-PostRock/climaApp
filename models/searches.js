const fs = require('fs');

const axios = require('axios');

class Searches {
	history = [];
	dbPath = './db/database.json';

	constructor() {
		//TODO: leer db si existe
		this.readDB();
	}

	get capitalizedHistory() {
		return this.history.map((place) => {
			let words = place.split(' ');
			words = words.map((word) => word[0].toUpperCase() + word.substring(1));
			return words.join(' ');
		});
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

		//Mantener sólo 6 en historial
		this.history = this.history.splice(0, 5);

		//Los lugares se agregan al inicio del array
		this.history.unshift(place.toLocaleLowerCase());

		//Grabar en DB
		this.saveDB();
	}

	saveDB() {
		const payload = {
			history: this.history,
		};

		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}

	//Leer DB
	readDB() {
		if (!fs.existsSync(this.dbPath)) {
			return null;
		}

		const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });

		const data = JSON.parse(info);

		this.history = data.history;
	}
}

module.exports = Searches;
