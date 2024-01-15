import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import IPharmacy from "../interfaces/IPharmacy";

const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.BASE_URL
}

export const pharmacyService = {
    async getPharmacyList(): Promise<IPharmacy[]> {
        const getPharmacyListUrl = '/Pharmacy';
        const response: AxiosResponse<IPharmacy[]> = await axios.get(getPharmacyListUrl, requestConfig);
        return response.data;
    }
}