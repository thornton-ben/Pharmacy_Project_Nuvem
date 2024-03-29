import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import PharmacySlice from "../slicers/pharmacySlice"

export const store = configureStore({
  reducer: {
    pharmacy: PharmacySlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
