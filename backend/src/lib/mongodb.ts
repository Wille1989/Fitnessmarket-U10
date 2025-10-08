import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME || 'fitnessMarket';


let client = new MongoClient(uri);
let clientPromise = client.connect();

async function getDb() {
    const client = await clientPromise;
    return client.db(dbName);
};

export default getDb;