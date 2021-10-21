import { Request, Response } from "express";
import log from "../logger";
import ApiClentModel from "../models/schema/apiClient.schema";
import { ApiClientService } from "../services/ApiClientService.services";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const apiClientService = new ApiClientService();
export class AuthController {



    public async register(request: Request, response: Response) {
        try {
            const APIClientID = request.body.apiClientID;
            const owner = request.body.owner;
            const email = request.body.email;
            const password = request.body.password;

            if (!APIClientID || !owner || !email || !password) throw new Error(" All fields are mandatory")

            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10);

            const doc = new ApiClentModel({
                apiClientId: APIClientID,
                owner: owner,
                email: email,
                password: encryptedPassword
            });

            const existAPIClient = await apiClientService.findApiClient({ apiClientId: APIClientID });

            if (existAPIClient) throw new Error("Client ID Already Exist. Please Login");

            const Apiclient = await apiClientService.createNewApiClient(doc);

            // Create token
            const token = jwt.sign(
                { apiClient_object_id: Apiclient._id, APIClientID },
                process.env.API_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            Apiclient.token = token;
            
            response.status(200).json(Apiclient);

        } catch (error) {
            response.status(400).json({ message: "Bad request error = " + error });
        }


    }


    public async login(request: Request, response: Response) {
        try {

            const APIClientID = request.body.apiClientID;
            const password = request.body.password;

            // Validate user input
            if (!(APIClientID && password)) {
                throw new Error("All input is required");
            }
            const apiClient = await apiClientService.findApiClient({ apiClientId: APIClientID });

            if (apiClient && (await bcrypt.compare(password, apiClient.password))) {
                // Create token
                const token = jwt.sign(
                    { apiClient_object_id: apiClient._id, APIClientID },
                    process.env.API_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                // save user token
                apiClient.token = token;

                // user
                response.status(200).json(apiClient);
            } else {
                throw new Error("Invalid Credentials");
            }

        } catch (err) {
            response.status(400).json({ message: "Bad request error = " + err });
        }
    }

    public validateAuth(request: Request, response: Response) {


        response.status(200).json(request.body.Apiclient);

    }

}