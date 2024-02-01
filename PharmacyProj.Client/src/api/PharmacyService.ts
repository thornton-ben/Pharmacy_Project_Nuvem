import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import IPharmacy from "../interfaces/IPharmacy"
import { getParams } from "../utilities/getParams"
import { pharmacyGetUrlFormatter } from "../utilities/formatters/urlFormatter"
import { createAsyncThunk } from "@reduxjs/toolkit"

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}
const url = "/Pharmacy/"

export const fetchPharmacyListAsync = createAsyncThunk(
  "pharmacy/fetchList",
  async (parameters: getParams | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.post("/Pharmacy/", parameters, requestConfig)
      return response.data
    } catch (err) {
      const hasErrResponse = (err as { response: { [key: string]: string } })
        .response
      if (!hasErrResponse) {
        throw err
      }
      return rejectWithValue(hasErrResponse)
    }
  },
)

export const savePharmacyAsync = createAsyncThunk(
  "pharmacy/savePharmacy",
  async (pharmacy: any, { rejectWithValue }) => {
    try {
      const response = await axios.put("/Pharmacy/", pharmacy, requestConfig)
      return response.data
    } catch (err) {
      const hasErrResponse = (err as { response: { [key: string]: string } })
        .response
      if (!hasErrResponse) {
        throw err
      }
      return rejectWithValue(hasErrResponse)
    }
  },
)

// export const pharmacyService = {
//   async getPharmacyList(parameters: getParams): Promise<IPharmacy[]> {
//     let url = pharmacyGetUrlFormatter(parameters.page, parameters.id)
//     const getPharmacyListUrl = "/Pharmacy/" + url
//     const response: AxiosResponse<IPharmacy[]> = await axios.get(
//       getPharmacyListUrl,
//       requestConfig,
//     )
//     return response.data
//   },

//   async updatePharmacy(pharmacy: IPharmacy): Promise<IPharmacy> {
//     const savePharmacyUrl = "/Pharmacy/" + pharmacy.id.toString()

//     const response: AxiosResponse<IPharmacy> = await axios.put(
//       savePharmacyUrl,
//       pharmacy,
//       requestConfig,
//     )
//     return response.data
//   },
// }
