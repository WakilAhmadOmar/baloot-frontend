import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Moment from "react-moment";

export type Product = {
  _id: string;
  entrepotName: string;
  productName:string;
  barcode: string;
  amount: number;
  measureName:string;
  expireDate: string;
  daysExpired: number;
};



export const buildColumns = (
  t: (key: string) => string,
): GridColDef<Product>[] => [
  {
    field: "productName",
    headerName: t("product_name"),
    width: 90,
    align: t("dir") === "ltr" ? "left" : "right",
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
  {
    field: "entrepotName",
    headerName: t("entrepot_name"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "measureName",
    headerName: t("measure_name"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "amount",
    headerName: t("amount"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "daysExpired",
    headerName: t("days_expired"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "expireDate",
    headerName: t("expire_date"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
    renderCell:((date) => (<Moment format="YYYY/MM/DD">{date?.row?.expireDate}</Moment>)),
  },
];
