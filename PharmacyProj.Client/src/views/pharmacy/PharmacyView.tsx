import React, { useEffect, useState } from "react"
import "./PharmacyView.css"
import {
  getPharmacyData,
  fetchPharmacyListAsync,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getParams } from "../../utilities/getParams"

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData)
  const dispatch = useAppDispatch()
  const [pharmacyGridRows, setGridRows] = useState(pharmacyList)
  let getParameters: getParams = { page: 1, id: undefined }

  useEffect(() => {
    dispatch(fetchPharmacyListAsync(getParameters))
  }, [])

  useEffect(() => {
    setGridRows(pharmacyList)
  }, [pharmacyList])

  return (
    <>
      <div>Pharmacy View</div>
      <div>
        {pharmacyGridRows.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
      <div>Will pass pharmacy list to grid component</div>
    </>
  )
}

export default PharmacyView
