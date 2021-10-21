import { ApiClientRepository } from "../repositories/ApiClientRepository.repositories";
const apiClientRepo = new ApiClientRepository();
export class ApiClientService {

    async findApiClient(filter: { apiClientId: any; }) {
        return await apiClientRepo.findOne(filter);
    }

    public async createNewApiClient(model: any) {
        return await apiClientRepo.create(model);
    }

}