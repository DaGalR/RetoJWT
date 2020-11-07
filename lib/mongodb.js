const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
console.log(uri);
const client = new MongoClient(uri, { useUnifiedTopology: true });
const dbName = "jwtEjercicio";

module.exports.connectDb = async () => {
  await client.connect();
  await client.db(dbName);
  console.log("Conectado a la BD");
};

module.exports.mongoClient = client;
