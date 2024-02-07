import React, { useEffect, useState } from "react"
import "./DeliveryView.css"
import {
  getDeliveryData,
  fetchDelivery,
  putDelivery,
  updateDeliverySlice,
  getDeliveryStatus,
  DeliverySlice,
} from "../../slicers/deliverySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getParams } from "../../utilities/getParams"
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
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
import { useParams } from "react-router-dom"
import Snackbar from "@mui/material/Snackbar"
import Alert, { AlertProps } from "@mui/material/Alert"
import IDelivery from "../../interfaces/IDelivery"
import { useSelector } from "react-redux"
import Loading from "../../components/loading/Loading"
import {
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleRowEditStop,
  handleProcessRowUpdateError,
} from "../../utilities/GridUtilities"

export const DeliveryView = () => {
  const deliveryList = useAppSelector(getDeliveryData)
  const dispatch = useAppDispatch()
  const [deliveryRows, setDeliveryRows] = useState(deliveryList)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )
  const stateStatus = useSelector(getDeliveryStatus)
  const [paginationModel, setPaginationModel] = React.useState({page: 0, pageSize: 5});
  const { pharmacyId } = useParams<{ pharmacyId: string }>()
  const [selectedPharma, setSelectedPharmal] = React.useState<number>(Number(pharmacyId));

  useEffect(() => {
    dispatch(fetchDelivery(undefined))
  }, [])

  useEffect(() => {
    setDeliveryRows(deliveryList)
  }, [deliveryList])

  const validationErrorsRef = React.useRef<{
    [key: string]: { [key: string]: boolean }
  }>({})
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)

  const processRowUpdate = async (newRow: IDelivery) => {
    const response: any = await dispatch(putDelivery(newRow))
    const returnedDelivery: any = response.payload
    setSnackbar({ children: "Successfully saved", severity: "success" })
    dispatch(
      updateDeliverySlice({
        id: returnedDelivery.id,
        updateData: returnedDelivery,
      }),
    )
    return returnedDelivery
  }

  const columns: GridColDef[] = [
    {
      field: "warehouseName",
      headerName: "Warehouse",
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
      field: "pharmacyName",
      headerName: "Pharmacy",
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
      field: "drugName",
      headerName: "Drug",
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
      field: "unitCount",
      headerName: "UnitCount",
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
      field: "unitPrice",
      headerName: "UnitPrice",
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
      field: "totalPrice",
      headerName: "TotalPrice",
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
                  deliveryRows,
                  setDeliveryRows,
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
      <div>Delivery View</div>
      <div className="container-xxl">
        {stateStatus === "loading" && <Loading></Loading>}
        <DataGrid
          rows={deliveryRows}
          getRowId={(p) => p.deliveryId}
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
            toolbar: { setDeliveryRows, setRowModesModel },
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

export default DeliveryView
