import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { pharmacyService } from "../api/PharmacyService"
import IPharmacy from "../interfaces/IPharmacy"
import IState from "../interfaces/IState"
import { getParams } from "../utilities/getParams"
import axios from "axios"
import { RootState } from "../app/store"

const initialState: IState = {
  data: [],
  selectedPharmacy: null,
  status: "idle",
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
    updatePharmacy: (state, action: PayloadAction<any>) => {
      const { id, updateData } = action.payload
      const targetPharmacy = state.data.find(
        (pharmacy) => pharmacy.pharmacyId === id,
      )
      if (targetPharmacy) {
        state.data = state.data.map((pharmacy) => {
          return pharmacy.pharmacyId === id ? updateData : targetPharmacy
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
  },
})

export const { getPharmacy } = PharmacySlice.actions
export const getPharmacyData = (state: RootState) => state.pharmacy.data
export default PharmacySlice.reducer
