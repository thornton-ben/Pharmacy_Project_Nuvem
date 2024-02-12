import React, { useEffect, useState } from "react"
import "./DeliveryView.css"
import {
  getDeliveryData,
  fetchDelivery,
  putDelivery,
  updateDeliverySlice,
  getDeliveryStatus,
  getTotalDeliveryCount,
} from "../../slicers/deliverySlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getParams } from "../../utilities/getParams"
import {
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridPreProcessEditCellProps,
} from "@mui/x-data-grid"
import { useParams } from "react-router-dom"
import Snackbar from "@mui/material/Snackbar"
import Alert, { AlertProps } from "@mui/material/Alert"
import IDelivery from "../../interfaces/IDelivery"
import { useSelector } from "react-redux"
import Loading from "../../components/loading/Loading"
import {
  handleRowEditStop,
  handleProcessRowUpdateError,
} from "../../utilities/GridUtilities"
import formatUSCurrency from "../../utilities/formatters/currencyFormatter"

export const DeliveryView = () => {
  const dispatch = useAppDispatch();
  const deliveryList = useAppSelector(getDeliveryData);
  const deliveryStatus = useSelector(getDeliveryStatus);
  const [deliveryRows, setDeliveryRows] = useState(deliveryList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const totalDeliveryCount = useSelector(getTotalDeliveryCount);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const [paginationParameters, setPaginationParameters] = React.useState<getParams>({
    pageSize: 5,
    page: 1,
    id: Number(pharmacyId)
});
const updatePaginationParameters = () => {
  setPaginationParameters({...paginationParameters, page: paginationModel.page + 1, pageSize: paginationModel.pageSize})
}

const getDeliveries = () => {
  dispatch(fetchDelivery({ pageSize: paginationModel.pageSize, page: paginationModel.page + 1, id: Number(pharmacyId) }))
};

  useEffect(() => {
    getDeliveries()
  }, [paginationModel])

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
      valueFormatter: (params) => formatUSCurrency(params.value),
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
      valueFormatter: (params) => formatUSCurrency(params.value),
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
  ]

  return (
    <>
      <div>Delivery View</div>
      <div className="container-xxl">
        {deliveryStatus === "loading" && <Loading></Loading>}
        <DataGrid
          rows={deliveryRows}
          getRowId={(p) => p.deliveryId}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          paginationModel={paginationModel}
          rowCount={totalDeliveryCount}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          onProcessRowUpdateError={(error) =>
            handleProcessRowUpdateError(setSnackbar, error)
          }
          pageSizeOptions={[5]}
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
