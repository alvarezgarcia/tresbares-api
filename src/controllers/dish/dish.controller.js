const ObjectId = require('mongodb').ObjectId;

const mongoDb = require('./../../dbs/mongo');

const collectionName = 'Dish';

async function getAll(req, res, next) {
  try {
    const collection = mongoDb.getConnection(collectionName);
    const dishes = await collection.find({}).toArray();

    return res.json(dishes);
  } catch (err) {
    return next(err);
  }
}

async function get(req, res, next) {
  const {dishId} = req.params;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const dish = await collection.findOne({_id: ObjectId(dishId)});

    if (!dish) {
      const error = new Error('Dish not found');
      error.status = 404;

      return next(error);
    }

    return res.json(dish);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  get,
  getAll
};
