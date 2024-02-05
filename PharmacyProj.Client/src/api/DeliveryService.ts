import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getParams } from "../utilities/getParams"
import { pharmacyGetUrlFormatter } from "../utilities/formatters/urlFormatter"
import { createAsyncThunk } from "@reduxjs/toolkit"

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}
const url = "/Delivery/"

export const fetchDeliveryListAsync = createAsyncThunk(
  "delivery/fetchList",
  async (parameters: getParams | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.post("/Delivery/", parameters, requestConfig)
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

export const saveDeliveryAsync = createAsyncThunk(
  "delivery/saveDelivery",
  async (Delivery: any, { rejectWithValue }) => {
    try {
      const response = await axios.put("/Delivery/", Delivery, requestConfig)
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

