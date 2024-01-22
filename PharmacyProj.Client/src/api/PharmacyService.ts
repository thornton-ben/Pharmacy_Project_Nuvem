import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import IPharmacy from "../interfaces/IPharmacy"
import { getParams } from "../utilities/getParams"
import { pharmacyGetUrlFormatter } from "../utilities/formatters/urlFormatter"

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}
export const pharmacyService = {
  async getPharmacyList(parameters: getParams): Promise<IPharmacy[]> {
    let url = pharmacyGetUrlFormatter(parameters.page, parameters.id)
    const getPharmacyListUrl = "/Pharmacy/" + url
    const response: AxiosResponse<IPharmacy[]> = await axios.get(
      getPharmacyListUrl,
      requestConfig,
    )
    return response.data
  },

  async updatePharmacy(pharmacy: IPharmacy): Promise<IPharmacy> {
    const savePharmacyUrl = "/Pharmacy/" + pharmacy.id.toString();
    const putParams = {
      id: pharmacy.id.toString(),
      pharmacy: pharmacy,
    }
    const response: AxiosResponse<IPharmacy> = await axios.put(
      savePharmacyUrl,
      putParams,
      requestConfig,
    )
    return response.data
  },
}
