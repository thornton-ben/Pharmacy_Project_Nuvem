import React, { useEffect, useState } from "react"
import "./PharmacyView.css"
import {
  getPharmacyData,
  fetchPharmacy,
  putPharmacy,
  updatePharmacySlice,
  getPharmacyStatus,
} from "../../slicers/pharmacySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridValueGetterParams,
  GridPreProcessEditCellProps,
  GridRowId,
} from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { LocalShippingOutlined } from "@mui/icons-material"
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
} from "../../utilities/GridUtilities"
import { Link } from "react-router-dom"

export const PharmacyView = () => {
  const pharmacyList = useAppSelector(getPharmacyData);
  const dispatch = useAppDispatch();
  const [pharmacyRows, setPharmacyRows] = useState(pharmacyList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const stateStatus = useSelector(getPharmacyStatus);
  const validationErrorsRef = React.useRef<{
    [key: string]: { [key: string]: boolean }
  }>({})
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null)
  const handleCloseSnackbar = () => setSnackbar(null)
  const processRowUpdate = async (newRow: IPharmacy) => {
    const response: any = await dispatch(putPharmacy(newRow))
    const returnedPharmacy: any = response.payload
    setSnackbar({ children: "Successfully saved", severity: "success" })
    dispatch(
      updatePharmacySlice({
        id: returnedPharmacy.id,
        updateData: returnedPharmacy,
      }),
    )
    return returnedPharmacy
  }

  useEffect(() => {
    dispatch(fetchPharmacy(undefined))
  }, [])

  useEffect(() => {
    setPharmacyRows(pharmacyList)
  }, [pharmacyList])


  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
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
      flex: 1.5,
      align: "center",
      headerAlign: "center",
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
      flex: 1,
      align: "center",
      headerAlign: "center",
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
      flex: 1,
      align: "center",
      headerAlign: "center",
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
      flex: 1,
      align: "center",
      headerAlign: "center",
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
      width: 150,
      align: "center",
      headerAlign: "center",
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
      flex: 1,
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
      align: "right",
      headerAlign: "right",
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
                  setSnackbar,
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
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() =>
                handleEditClick(id, rowModesModel, setRowModesModel)
              }
              color="inherit"
            />
            <Link to={`/delivery/${id}`} className="text-black">
              <LocalShippingOutlined />
            </Link>
          </>,
        ]
      },
    },
  ]

  return (
    <>
      <div className="title">Pharmacy View</div>
      <div className="container-xxl">
        <div className="flex-col">
          {stateStatus === "loading" && <Loading></Loading>}
          <DataGrid
            rows={pharmacyRows}
            getRowId={(p) => p.pharmacyId}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
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
      </div>
    </>
  )
}

export default PharmacyView
