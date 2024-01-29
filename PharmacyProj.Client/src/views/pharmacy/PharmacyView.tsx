import React, { useEffect, useState } from "react"
import "./PharmacyView.css"
import {
  getPharmacyData,
  fetchPharmacyListAsync,
  savePharmacy,
  updatePharmacySlice,
  getPharmacyStatus,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getParams } from "../../utilities/getParams"
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValueGetterParams,
  GridPreProcessEditCellProps,
} from "@mui/x-data-grid"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { Save, Close, Edit } from "@mui/icons-material"
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from "@mui/x-data-grid/internals"
import Snackbar from "@mui/material/Snackbar"
import Alert, { AlertProps } from "@mui/material/Alert"
import IPharmacy from "../../interfaces/IPharmacy"
import { useSelector } from "react-redux"
import Loading from "../../components/loading/Loading"
import {
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleRowEditStop,
  handleProcessRowUpdateError,
  handleRowModesModelChange
} from "../../utilities/GridUtilities"

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData)
  const dispatch = useAppDispatch()
  const [pharmacyRows, setPharmacyRows] = useState(pharmacyList)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )
  const stateStatus = useSelector(getPharmacyStatus)

  useEffect(() => {
    dispatch(fetchPharmacyListAsync(getParameters))
  }, [])

  useEffect(() => {
    setPharmacyRows(pharmacyList)
  }, [pharmacyList])

  const validationErrorsRef = React.useRef<{
    [key: string]: { [key: string]: boolean }
  }>({})
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null)

  let getParameters: getParams = { page: 1, id: undefined }

  const handleCloseSnackbar = () => setSnackbar(null)

  const processRowUpdate = async (newRow: IPharmacy) => {
    const response: any = await dispatch(savePharmacy(newRow));
    const returnedPharmacy: any = response.payload;
    setSnackbar({ children: "Successfully saved", severity: "success" })
    dispatch(
      updatePharmacySlice({
        id: returnedPharmacy.id,
        updateData: returnedPharmacy,
      }),
    )
    return returnedPharmacy;
  }
  

  // const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
  //   setRowModesModel(newRowModesModel)
  // }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 130,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length == 0
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          name: hasError,
        }
        return { ...params.props, error: hasError }
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length == 0
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          address: hasError,
        }
        return { ...params.props, error: hasError }
      },
    },
    {
      field: "city",
      headerName: "City",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length == 0
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          city: hasError,
        }
        return { ...params.props, error: hasError }
      },
    },
    {
      field: "state",
      headerName: "State",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length != 2
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          state: hasError,
        }
        return { ...params.props, error: hasError }
      },
    },
    {
      field: "zip",
      headerName: "Zip Code",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length != 5
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          zip: hasError,
        }
        return { ...params.props, error: hasError }
      },
    },
    {
      field: "filledPrescriptions",
      headerName: "Filled Perscriptions",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value < 0 || params.props.value == null
        validationErrorsRef.current[params.id] = {
          ...validationErrorsRef.current[params.id],
          filledPerscriptions: hasError,
        }
        return { ...params.props, error: hasError }
      },
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
              onClick={() =>
                handleSaveClick(
                  id,
                  rowModesModel,
                  setRowModesModel,
                  validationErrorsRef,
                )
              }
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() =>
                handleCancelClick(
                  id,
                  rowModesModel,
                  setRowModesModel,
                  pharmacyRows,
                  setPharmacyRows,
                  validationErrorsRef,
                )
              }
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id, rowModesModel, setRowModesModel)}
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
        {stateStatus === "loading" && <Loading></Loading>}
        <DataGrid
          rows={pharmacyRows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // onRowModesModelChange={(rowModesModel) => handleRowModesModelChange(rowModesModel, setRowModesModel)}
          onProcessRowUpdateError={(error) =>
            handleProcessRowUpdateError(setSnackbar, error)
          }
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
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
