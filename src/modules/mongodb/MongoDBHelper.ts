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
        const options = {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        try {
            await Mongoose.connect(EVM.MONGO_DB_URI)

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
