import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Moment from "react-moment";

export type Journal = {
  id: string;
  payer: string;
  description: string;
  currency: string;
  amount: number;
  receiver: string;
  created_at: string;
};

export const journalColumns = (
  t: (key: string) => string
): GridColDef<Journal>[] => [
  {
    field: "payer",
    headerName: t("journal.payer"),
    width: 90,
    align: t("dir") === "ltr" ? "left" : "right",
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
  {
    field: "description",
    headerName: t("journal.description"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "currency",
    headerName: t("journal.currency"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "amount",
    headerName: t("journal.amount"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "receiver",
    headerName: t("journal.receiver"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
  },
  {
    field: "created_at",
    headerName: t("journal.created_at"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left" : "right",
    renderCell: (date) => (
      <Moment format="YYYY/MM/DD">{date?.row?.created_at}</Moment>
    ),
  },
];
