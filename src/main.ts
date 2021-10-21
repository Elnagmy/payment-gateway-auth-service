import database from "./database/database";
import * as dotenv from 'dotenv';
import express from "express";
import log from "./logger";
import AuthRouter from "./routers/authentication.router";
const API_PORT = process.env.API_PORT!;

dotenv.config();
database();
const app = express();
app.use(express.json());
app.use(AuthRouter);
app.listen(API_PORT, () => {
    log.info(`Server listing at http://localhost:` + API_PORT);
})