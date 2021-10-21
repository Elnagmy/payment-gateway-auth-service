import mongoose from "mongoose";
import log from "../logger";
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? '';

export default async () => {
    return mongoose.connect(MONGO_URI).then(() => {
        log.info("Database connected");
    }).catch((error) => {
        log.error("db error", error);
        process.exit(1);
    });
};