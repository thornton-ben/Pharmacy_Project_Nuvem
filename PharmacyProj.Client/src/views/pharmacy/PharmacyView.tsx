import React, { useEffect, useState } from "react"
import "./PharmacyView.css"
import {
  getPharmacyData,
  fetchPharmacyListAsync,
  savePharmacy,
  updatePharmacy,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getParams } from "../../utilities/getParams"
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { Save, Close, Edit } from "@mui/icons-material"
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from "@mui/x-data-grid/internals"
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData)
  const dispatch = useAppDispatch()
  const [pharmacyRows, setPharmacyRows] = useState(pharmacyList)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);
  let getParameters: getParams = { page: 1, id: undefined }

  useEffect(() => {
    dispatch(fetchPharmacyListAsync(getParameters))
  }, [])

  useEffect(() => {
    setPharmacyRows(pharmacyList)
  }, [pharmacyList])

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = pharmacyRows.find((row) => row.id === id)
    //  if (editedRow!.isNew) {
    setPharmacyRows(pharmacyRows.filter((row) => row.id !== id))
    //  }
  }

  const processRowUpdate = React.useCallback(
    async (savedRow: GridRowModel) => {
      //@ts-expect-error
      const returnedPharmacy: any = await dispatch(savePharmacy(savedRow))
      setSnackbar({ children: "Successfully saved", severity: "success" })

      dispatch(
        updatePharmacy({
          id: returnedPharmacy.payload.id,
          newData: returnedPharmacy.payload,
        }),
      )
      return returnedPharmacy.payload
    },
    [dispatch(savePharmacy)],
  )

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: "error" })
  }, [])

  const columns: GridColDef[] = [
    { field: "pharmacyId", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", width: 130, editable: true },
    { field: "city", headerName: "City", width: 130, editable: true },
    { field: "statecode", headerName: "State", width: 130, editable: true },
    {
      field: "filledPersriptions",
      headerName: "Filled Perscriptions",
      width: 130,
      editable: true,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      width: 130,
      type: "date",
      headerAlign: "center",
      align: "center",
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.updatedDate
          ? new Date(params.row.updatedDate)
          : new Date(params.row.createdDate)
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <>
      <div>Pharmacy View</div>
      <div className="container-xxl">
        <DataGrid
          rows={pharmacyRows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slotProps={{
            toolbar: { setPharmacyRows, setRowModesModel },
          }}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </>
  )
}

export default PharmacyView
