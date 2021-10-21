import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import log from "../logger";
dotenv.config();

export class AdminMiddelware {

    public async validateAdminToken(request: Request, response: Response, next: NextFunction) {

        try {
            const token = request.headers.admintoken;
            //log.info(process.env.Admin_Token);
            //log.info(token);
            if (token != process.env.Admin_Token ?? '') throw new Error("not authorized ");
            next()
        } catch (e) {
            log.info(" un-Authorized Admin access ")
            response.status(401).json({ message: 'Only Admin can access this end point.' })
        }

    }
}