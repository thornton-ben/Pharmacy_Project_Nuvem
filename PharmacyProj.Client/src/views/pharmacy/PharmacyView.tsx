import React, { useEffect, useState } from "react"
import "./Pharmacy.css"
import {
  getPharmacyData,
  fetchPharmacyListAsync,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData)
  const dispatch = useAppDispatch()
  const [gridRows, setGridRows] = useState(pharmacyList)

  useEffect(() => {
    setGridRows(pharmacyList)
  }, [pharmacyList])

  useEffect(() => {
    dispatch(fetchPharmacyListAsync())
  }, [])

  return (
    <>
      <div>Pharmacy View</div>
      <div>Will pass pharmacy list to grid component</div>
    </>
  )
}

export default PharmacyView
