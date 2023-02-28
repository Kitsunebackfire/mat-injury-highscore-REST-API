const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoDb = MongoMemoryServer;

const connect = async () => {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();  
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
};

const cleanData = async () => {
  await mongoose.connection.db.dropDatabase();
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDb.stop();
};

module.exports = { connect, cleanData, disconnect };
