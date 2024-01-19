import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import IPharmacy from "../interfaces/IPharmacy"
import { getParams } from "../utilities/getParams"
import { pharmacyGetUrlFormatter } from "../utilities/formatters/urlFormatter"

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}
//TODO: add params for page and number per page
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
}
