import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import log from "../logger";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

export class ApiClinetMiddelware {

    public async validateToken(request: Request, response: Response, next: NextFunction) {
        log.info("Getting token Vildation request Token =");

        try {
            const token = request.body.token || request.query.token || request.headers["x-access-token"];
            if (!token) {
                throw new Error("A token is required for authentication");
            }
            log.info(token);
            try {
                log.info("decoding token");
                const decoded = jwt.verify(token, process.env.API_KEY);
                log.info(decoded);
                request.body.Apiclient = decoded;
            } catch (err) {
                throw new Error("Invalid Token");
            }
            next()
        } catch (err: any) {
            log.error(err);
            response.status(401).json({ isucess: false, message: err.message })
        }

    }
}