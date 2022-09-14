import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb"
import {data} from "../data"
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const client = new MongoClient(process.env.MONGODB_URl)
        await client.connect()
        const database = client.db("Town")
        const collection = database.collection("Todos")
        await collection.deleteMany({})
        await collection.insertMany(data);
        context.res = {
            body: "connect to db successfully"
        };
     } catch (e) {
        console.log(e);
    }
};

export default httpTrigger;