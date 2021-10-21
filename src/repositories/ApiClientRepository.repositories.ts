

import database from "../database/database"
import ApiClentModel from "../models/schema/apiClient.schema";
import log from "../logger"
export class ApiClientRepository {

    public async findOne(filter: { apiClientId: any; }) {
        database();
        const object = await ApiClentModel.findOne(filter);
        return object;

    }


    public async create(model: any) {
        database();
        return await model.save();
    }



}