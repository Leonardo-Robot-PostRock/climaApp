const {
	readInput,
	inquirerMenu,
	pause,
	confirm,
} = require('./helpers/inquirer');

const main = async () => {
	let opt = '';
	let confirmOption = '';

	do {
		const opt = await inquirerMenu();

		switch (opt) {
			case 1:
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
