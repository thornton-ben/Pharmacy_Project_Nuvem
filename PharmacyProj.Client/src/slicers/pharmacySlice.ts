import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  savePharmacyAsync,
  fetchPharmacyListAsync,
} from "../api/PharmacyService"
import IPharmacy from "../interfaces/IPharmacy"
import IState from "../interfaces/IState"
import { getParams } from "../utilities/getParams"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { RootState } from "../app/store"
import { GridValidRowModel } from "@mui/x-data-grid"
import { act } from "react-dom/test-utils"
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
}

const initialState: IState = {
  data: [],
  selectedPharmacy: null,
  status: "idle",
  error: "",
}

export const fetchPharmacy = (getParams: getParams | undefined) => fetchPharmacyListAsync(getParams)
export const putPharmacy = (pharmacy: IPharmacy | undefined) => savePharmacyAsync(pharmacy)

export const PharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    getPharmacy: (state, action: PayloadAction<number> | null) => {
      if (action?.payload != null) {
        const selectPharmacy = state.data.find(
          (pharmacy) => pharmacy.id === action.payload,
        )
        state.selectedPharmacy = selectPharmacy
      } else {
        state.selectedPharmacy = null
      }
    },
    updatePharmacySlice: (state, action: PayloadAction<any>) => {
      const { id, updateData } = action.payload
      const targetPharmacy = state.data.find((pharmacy) => pharmacy.id === id)
      if (targetPharmacy) {
        state.data = state.data.map((pharmacy) => {
          return pharmacy.id === id ? updateData : pharmacy
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

export const { getPharmacy, updatePharmacySlice } = PharmacySlice.actions
export const getPharmacyData = (state: RootState) => state.pharmacy.data
export const getPharmacyStatus = (state: RootState) => state.pharmacy.status
export default PharmacySlice.reducer
