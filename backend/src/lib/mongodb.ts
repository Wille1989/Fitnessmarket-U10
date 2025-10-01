import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName: string = process.env.MONGO_DB_NAME || 'fitnessMarket';

let client = new MongoClient(uri);
let clientPromise = client.connect();

async function getDb() {
    const client = await clientPromise;
    return client.db(dbName);
};

export default getDb;