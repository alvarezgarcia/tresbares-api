const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function promisifyQuestion(label) {
	return new Promise((resolve, reject) => {
		rl.question(label, (answer) => {
			if (answer === 'yes') {
				return resolve(true);
			}

			return resolve(false);
		});
	});
}

module.exports = {
  promisifyQuestion
}
