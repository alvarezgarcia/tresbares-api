'use strict';

const {mongoUri} = require('../src/config');
const {promisifyQuestion} = require('./helpers/');
const dishesInfo = require('./data/dishes.json');

const collectionName = 'Dish';
const mongoDb = require('./../src/dbs/mongo');

(async () => {

  try {
    await mongoDb.connect(mongoUri);
    console.log('Connected');

		const collection = mongoDb.getConnection(collectionName);

		const cont = await promisifyQuestion(`¿Está seguro que desea continuar? (yes/no)\nEsta acción eliminará el contenido de la colección ${collectionName}\n`);

		if (!cont) {
			throw new Error('No se aplicarán los cambios en la DB');
		}

		await collection.deleteMany({});
		await collection.insert(dishesInfo);

    console.log(`Se han insertado exitósamente ${dishesInfo.length} documentos en la colección ${collectionName}`);
  } catch (err) {
    console.log(err.message);
  }

	return process.exit(-1);

})();
