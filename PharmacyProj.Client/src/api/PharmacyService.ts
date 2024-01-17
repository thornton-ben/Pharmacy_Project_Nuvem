import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import IPharmacy from "../interfaces/IPharmacy"
import { pharmacyGetUrlFormatter } from "../utilities/formatters/urlFormatter"

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}
//TODO: add params for page and number per page
export const pharmacyService = {
  async getPharmacyList(page: number = 1, id?: number): Promise<IPharmacy[]> {
    let url = pharmacyGetUrlFormatter(page, id)
    const getPharmacyListUrl = "/Pharmacy/" + url
    const response: AxiosResponse<IPharmacy[]> = await axios.get(
      getPharmacyListUrl,
      requestConfig,
    )
    return response.data
  },
}
