import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getParams } from "../utilities/getParams"
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
