const ObjectId = require('mongodb').ObjectId;

const mongoDb = require('./../../dbs/mongo');

const collectionName = 'Table';

async function getAll(req, res, next) {
  try {
    const collection = mongoDb.getConnection(collectionName);
    const tables = await collection.find({}).toArray();

    return res.json(tables);
  } catch (err) {
    return next(err);
  }
}

async function get(req, res, next) {
  const {tableId} = req.params;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const table = await collection.findOne({_id: ObjectId(tableId)});

    if (!table) {
      const error = new Error('Table not found');
      error.status = 404;

      return next(error);
    }

    return res.json(table);
  } catch (err) {
    return next(err);
  }
}

async function addDish(req, res, next) {
  const {tableId} = req.params;
  const {body: dishToAdd} = req;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const ok = await collection.update({_id: ObjectId(tableId)}, {$push: {served: dishToAdd}});

    if (!ok) {
      const error = new Error('Dish not added');
      error.status = 500;

      return next(error);
    }

    return res.json(dishToAdd);
  } catch (err) {
    return next(err);
  }
}

async function deleteDish(req, res, next) {
  const {tableId, dishId} = req.params;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const ok = await collection.update({_id: ObjectId(tableId)}, {$pull: {served: { id: parseInt(dishId) } }});

    if (!ok) {
      const error = new Error('Dish not deleted');
      error.status = 500;

      return next(error);
    }

    res.status(204);
    return res.send();
  } catch (err) {
    return next(err);
  }
}

async function openTable(req, res, next) {
  const {tableId} = req.params;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const ok = await collection.update({_id: ObjectId(tableId)}, {$set: {open: true, openAt: new Date(), served: []}});

    if (!ok) {
      const error = new Error('Could not open table');
      error.status = 500;

      return next(error);
    }

    res.status(204);
    return res.send();
  } catch (err) {
    return next(err);
  }
}

async function closeTable(req, res, next) {
  const {tableId} = req.params;

  try {
    const collection = mongoDb.getConnection(collectionName);
    const ok = await collection.update({_id: ObjectId(tableId)}, {$set: {open: false, openAt: false, served: []}});

    if (!ok) {
      const error = new Error('Could not close table');
      error.status = 500;

      return next(error);
    }

    res.status(204);
    return res.send();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  get,
  getAll,
  addDish,
  deleteDish,
  openTable,
  closeTable
};
