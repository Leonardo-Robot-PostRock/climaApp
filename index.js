const {
	readInput,
	inquirerMenu,
	pause,
	confirm,
	listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();

const main = async () => {
	let opt = '';
	let confirmOption = '';
	const searches = new Searches();

	do {
		const opt = await inquirerMenu();

		switch (opt) {
			case 1:
				//Mostrar mensaje
				const searchTerms = await readInput('Ciudad: ');

				//Buscar los lugares
				const places = await searches.city(searchTerms);

				//Seleccionar el lugar
				const selectedId = await listPlaces(places);

				const selectedPlace = places.find((place) => place.id === selectedId);

				//Clima
				const weather = await searches.weatherPlace(
					selectedPlace.lat,
					selectedPlace.lng
				);

				//Mostrar resultados
				console.clear();
				console.log('\nInformación de la ciudad\n'.green);
				console.log('Ciudad:', selectedPlace.name);
				console.log('Lat:', selectedPlace.lat);
				console.log('Lng:', selectedPlace.lng);
				console.log('Temperatura:', weather.temp);
				console.log('Mínima:', weather.min);
				console.log('Máxima:', weather.max);
				console.log('El clima actual es:', weather.desc);
				break;
			case 2:
				break;
			default:
				break;
		}

		if (opt !== 0) {
			await pause();
		}

		console.clear();
		if (opt === 0) {
			confirmOption = await confirm();
		}
	} while (confirmOption !== 'si');
};

main();
