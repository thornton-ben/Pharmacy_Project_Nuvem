import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { pharmacyService } from "../api/PharmacyService"
import IPharmacy from "../interfaces/IPharmacy"
import IState from "../interfaces/IState"
import { getParams } from "../utilities/getParams"
import axios from "axios"
import { RootState } from "../app/store"
import { GridValidRowModel } from "@mui/x-data-grid"

const initialState: IState = {
  data: [],
  selectedPharmacy: null,
  status: "idle",
  error: "",
}

export const fetchPharmacyListAsync = createAsyncThunk<IPharmacy[], getParams>(
  "pharmacy/fetchList",
  async (parameters: getParams, { signal }) => {
    const cancelSource = axios.CancelToken.source()
    signal.addEventListener("abort", () => {
      cancelSource.cancel()
    })
    const list = await pharmacyService.getPharmacyList(parameters)
    return [...list]
  },
)

export const savePharmacy = createAsyncThunk<IPharmacy, GridValidRowModel>(
  "pharmacy/savePharmacy",
  async (pharmacy: any) => {
    const updatedPharmacy = await pharmacyService.updatePharmacy(pharmacy)
    return updatedPharmacy
  },
)

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
      .addCase(fetchPharmacyListAsync.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(savePharmacy.pending, (state) => {
        state.status = "saving"
        state.error = ""
      })
      .addCase(savePharmacy.fulfilled, (state) => {
        state.status = "succeeded"
        state.error = ""
      })
      .addCase(savePharmacy.rejected, (state, action) => {
        state.status = "failed"
        state.error = "saving"
        console.log(action.error.message)
      })
  },
})

export const { getPharmacy, updatePharmacySlice } =
  PharmacySlice.actions
export const getPharmacyData = (state: RootState) => state.pharmacy.data
export const getPharmacyStatus = (state: RootState) => state.pharmacy.status
export default PharmacySlice.reducer
