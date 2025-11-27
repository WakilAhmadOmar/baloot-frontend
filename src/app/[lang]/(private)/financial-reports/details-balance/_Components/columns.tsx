import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Balances = {
  currencyId: {
    _id: string;
    name: string;
    symbol: string;
  };
  balance: number;
};

export type ReportRow = {
  _id: string;
  name: string;
  contactNumber: string;
  address: string;
  balances: Balances[];
};

export const buildColumns = (
  t: (key: string) => string,
  name:string
): GridColDef<ReportRow>[] => [
  {
    field: name,
    headerName: t("name"),
    width: 90,
    align: t("dir") === "ltr" ? "left": "right",
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
  {
    field: "debit",
    headerName: t("debit"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Box>
          {params.row.balances.map((balance: Balances) => (
            <Box
              key={balance.currencyId._id}
              display="flex"
              alignContent={"center"}
            >
              <span>{balance.balance >= 0 ? balance.balance : 0}</span>
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    field: "credit",
    headerName: t("credit"),
    width: 150,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Box>
          {params.row.balances.map((balance: Balances) => (
            <Box
              key={balance.currencyId._id + balance?.currencyId?.name}
              display="flex"
              alignContent={"center"}
            >
              <span>{balance.balance < 0 ? balance.balance : 0}</span>
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    field: "currency",
    headerName: t("currency"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Box>
          {params.row.balances.map((balance: Balances) => (
            <Box
              key={balance.currencyId._id}
              display="flex"
              alignContent={"center"}
            >
              <span>{balance.currencyId.symbol}</span>
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    field: "contactNumber",
    headerName: t("contact_number"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left": "right"
  },
  {
    field: "address",
    headerName: t("address"),
    flex: 1,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
    align: t("dir") === "ltr" ? "left": "right"
  },
];
