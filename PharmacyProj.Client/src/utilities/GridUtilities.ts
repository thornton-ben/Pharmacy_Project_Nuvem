import {
  GridEventListener,
  GridRowEditStopParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  MuiEvent,
} from "@mui/x-data-grid"
import IPharmacy from "../interfaces/IPharmacy"
import React, { Dispatch, SetStateAction } from "react"
import { AlertProps } from "@mui/material"

export const handleRowEditStop: GridEventListener<"rowEditStop"> = (
  params: GridRowEditStopParams,
  event: MuiEvent,
) => {
  if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    event.defaultMuiPrevented = true
  }
}

export const handleEditClick = (
  id: GridRowId,
  rowModesModel: GridRowModesModel,
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>,
  GridRowModes: any,
) => {
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
}

export const handleSaveClick = (
  id: GridRowId,
  rowModesModel: GridRowModesModel,
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>,
  validationErrorsRef: React.MutableRefObject<{
    [key: string]: { [key: string]: boolean } | undefined
  }>,
) => {
  const rowValidationErrors = validationErrorsRef.current[id]

  if (rowValidationErrors === undefined) {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    return;
  }

  if (rowValidationErrors !== undefined) {
    const errors = Object.values(rowValidationErrors).filter(
      (hasError) => hasError === true,
    );
    if (errors.length === 0) {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View },
      });
      validationErrorsRef.current[id] = undefined;
      return;
    }
  }

  //TODO: What to do if there are validation errors
}

export const handleCancelClick = (
  id: GridRowId,
  rowModesModel: GridRowModesModel,
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>,
  rows: any[],
  setRows: Dispatch<SetStateAction<any>>,
  validationErrorsRef: React.MutableRefObject<{
    [key: string]: { [key: string]: boolean } | undefined
  }>,
  setgirdActionsDisabled?: Dispatch<SetStateAction<boolean>>,
) => {
  setRowModesModel({
    ...rowModesModel,
    [id]: { mode: GridRowModes.View, ignoreModifications: true },
  })
  validationErrorsRef.current[id] = undefined
}

export const handleProcessRowUpdateError = (
  setSnackbar: Dispatch<
    SetStateAction<Pick<AlertProps, "children" | "severity"> | null>
  >,
  error: Error,
) => {
  return () => {
    setSnackbar({ children: error.message, severity: "error" })
  }
}
