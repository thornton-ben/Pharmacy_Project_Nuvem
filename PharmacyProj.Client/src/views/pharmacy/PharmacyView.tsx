import React, { useEffect, useState } from "react"
import "./PharmacyView.css"
import {
  getPharmacyData,
  fetchPharmacyListAsync,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData)
  const dispatch = useAppDispatch()
  const [pharmacyGridRows, setGridRows] = useState(pharmacyList)

  useEffect(() => {
    dispatch(fetchPharmacyListAsync())
  }, [])
  
  useEffect(() => {
    setGridRows(pharmacyList)
    console.log(pharmacyGridRows)
  }, [pharmacyList])
  
  return (
    <>
      <div>Pharmacy View</div>
      <div>
        {/* map grid row? */}
      </div>
      <div>Will pass pharmacy list to grid component</div>
    </>
  )
}

export default PharmacyView
