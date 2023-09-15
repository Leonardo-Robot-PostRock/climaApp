const {
	readInput,
	inquirerMenu,
	pause,
	confirm,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
	let opt = '';
	let confirmOption = '';
	const searches = new Searches();

	do {
		const opt = await inquirerMenu();

		switch (opt) {
			case 1:
				//Mostrar mensaje
				const lugar = await readInput('Ciudad: ');
				await searches.ciudad(lugar);
				//Buscar los lugares

				//Seleccionar el lugar

				//Clima

				//Mostrar resultados
				console.log('\nInformación de la ciudad\n'.green);
				console.log('Ciudad:');
				console.log('Lat:');
				console.log('Lng:');
				console.log('Temperatura:');
				console.log('Mínima:');
				console.log('Máxima:');
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
