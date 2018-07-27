const {MongoClient} = require('mongodb');

const {tableName} = require('./../../config');

let dbConnection;

module.exports = {

  connect: url =>
    MongoClient.connect(url, {useNewUrlParser: true})
      .then(db => dbConnection = db.db(tableName)),

  getConnection: collectionName => dbConnection.collection(collectionName)
 
};
  
