import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  savePharmacyAsync,
  fetchPharmacyListAsync,
} from "../api/PharmacyService"
import IPharmacy from "../interfaces/IPharmacy"
import { getParams } from "../utilities/getParams"
import  { AxiosRequestConfig } from "axios"
import { RootState } from "../app/store"
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}

interface IPharmacyState {
  data: IPharmacy[]
  status: "idle" | "loading" | "failed" | "succeeded" | "saving"
  error: any
}

const initialState: IPharmacyState = {
  data: [],
  status: "idle",
  error: "",
}



export const fetchPharmacy = (getParams: getParams | undefined) => fetchPharmacyListAsync(getParams)
export const putPharmacy = (pharmacy: IPharmacy | undefined) => savePharmacyAsync(pharmacy)

export const PharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    updatePharmacySlice: (state, action: PayloadAction<any>) => {
      const { id, updateData } = action.payload
      const targetPharmacy = state.data.find((pharmacy) => pharmacy.pharmacyId === id)
      if (targetPharmacy) {
        state.data = state.data.map((pharmacy) => {
          return pharmacy.pharmacyId === id ? updateData : pharmacy
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacyListAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPharmacyListAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload
      })
      .addCase(fetchPharmacyListAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(savePharmacyAsync.pending, (state) => {
        state.status = "saving"
        state.error = ""
      })
      .addCase(savePharmacyAsync.fulfilled, (state) => {
        state.status = "succeeded"
        state.error = ""
      })
      .addCase(savePharmacyAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
        console.log(action.error.message)
      })
  },
})

export const { updatePharmacySlice } = PharmacySlice.actions
export const getPharmacyData = (state: RootState) => state.pharmacy.data
export const getPharmacyStatus = (state: RootState) => state.pharmacy.status
export default PharmacySlice.reducer
