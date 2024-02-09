import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  saveDeliveryAsync,
  fetchDeliveryListAsync,
} from "../api/DeliveryService"
import IDelivery from "../interfaces/IDelivery"
import { getParams } from "../utilities/getParams"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { RootState } from "../app/store"
import { GridValidRowModel } from "@mui/x-data-grid"
import { act } from "react-dom/test-utils"
import { T } from "vitest/dist/types-e3c9754d.js"
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}

interface IDeliveryState {
  data: Array<IDelivery>
  totalCount: number | undefined
  status: string | undefined
  error: string | undefined
}

const initialState: IDeliveryState = {
  data: [],
  totalCount: 0,
  status: "idle",
  error: "",
}

export const fetchDelivery = (getParams: getParams | undefined) =>
  fetchDeliveryListAsync(getParams)
export const putDelivery = (delivery: IDelivery | undefined) =>
  saveDeliveryAsync(delivery)

export const DeliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    updateDeliverySlice: (state, action: PayloadAction<any>) => {
      const { id, updateData } = action.payload
      const targetDelivery = state.data.find(
        (delivery) => delivery.deliveryId === id,
      )
      if (targetDelivery) {
        state.data = state.data.map((delivery) => {
          return delivery.deliveryId === id ? updateData : delivery
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryListAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchDeliveryListAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload.items
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchDeliveryListAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(saveDeliveryAsync.pending, (state) => {
        state.status = "saving"
        state.error = ""
      })
      .addCase(saveDeliveryAsync.fulfilled, (state) => {
        state.status = "succeeded"
        state.error = ""
      })
      .addCase(saveDeliveryAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
        console.log(action.error.message)
      })
  },
})

export const { updateDeliverySlice } = DeliverySlice.actions
export const getDeliveryData = (state: RootState) => state.delivery.data
export const getDeliveryStatus = (state: RootState) => state.delivery.status
export default DeliverySlice.reducer
