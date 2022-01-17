/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-17
 * @modify date 2022-01-17
 */

import Mongoose, { Schema } from "mongoose";
import EVM from "../EnvironmentVariableManager"

class MongoDBHelper {
    private db: Mongoose.Connection
    private callback: Function = null
    public isMongoConnected: boolean = false

    public async init(): Promise<Mongoose.Connection> {
        this.db = Mongoose.connection
        try {
            await Mongoose.connect(EVM.MONGO_DB_URI, { authSource: "admin" })

            console.log("MongoDB Connected")
            this.callback && this.callback()
            this.isMongoConnected = true

            return this.db

        } catch (error) {
            console.error(`MongoDB disconnected ${error}`);
            process.exit()
        }
    }

    open(callback: Function) {
        this.callback = callback;
    }

    public getDB(): Mongoose.Connection {
        return this.db;
    }

}

export default new MongoDBHelper();
