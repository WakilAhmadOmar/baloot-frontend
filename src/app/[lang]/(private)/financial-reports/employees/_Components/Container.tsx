"use client"
import CustomSearch from "@/components/search/CustomSearch";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AddCircle, ExportSquare, MinusCirlce, Printer } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface IPropsCollapseContainer {
    t:any
}
const CustomerFinancialReports:React.FC<IPropsCollapseContainer> = ({t}) => {
  const theme = useTheme();
  const [loadingPage, setLoadingPage] = useState(false);
//   const router = useRouter();
  const routeToDetailsPage = () => {
    // router?.push({
    //   pathname: "/financialReports/customerAccounts/details",
    //   query: { ID: "accountId" },
    // });
  };
  return (
    <Box>
      <Typography variant="h3">صورت حساب کارمندان</Typography>
      <Box
        display={"flex"}
        columnGap={"1rem"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        mb={2}
        mt={2}
      >
        <Box display={"flex"} justifyItems={"center"}>
          {/* <DateRangePickerComponent /> */}
        </Box>
        <Box pt={1}>
          <CustomSearch t={t} />
        </Box>
      </Box>
      <Box
        // onClick={routeToDetailsPage}
        sx={{
          bgcolor: theme.palette.background.default,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "8px",
          alignItems: "center",
          cursor: "pointer",
        }}
        pl={2}
        pr={2}
        pt={2.5}
        pb={2.5}
        m={0.5}
      >
        <Typography variant="h5">وکیل احمد عمری</Typography>
        
        <Box display={"flex"} alignItems={"center"} gap={"1rem"} alignContent={"center"} >
        <Typography variant="body1" justifySelf={"center"} my={"auto"}  display={"flex"}>10000 افغانی</Typography>
        <MinusCirlce color={theme.palette.error.main} size={20}/>
        </Box>
      </Box>
      <Link href={"#"}>
      <Box
        // onClick={routeToDetailsPage}
        sx={{
        bgcolor: theme.palette.background.default,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "8px",
          alignItems: "center",
          cursor: "pointer",
        }}
        pl={2}
        pr={2}
        pt={2.5}
        pb={2.5}
        m={0.5}
      >
        <Typography variant="h5">وکیل احمد عمری</Typography>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"} alignContent={"center"} >
        <Typography variant="body1" justifySelf={"center"} my={"auto"}  display={"flex"}>10000 افغانی</Typography>
        <AddCircle color={theme.palette.primary.main} size={20}/>
        </Box>
      </Box>
      </Link>
      

      <Stack
        spacing={2}
        sx={{ justifyContent: "end", display: "grid", marginTop: "2rem" }}
      >
        {/* <Pagination count={10} shape="rounded" /> */}
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          color={"primary"}
        />
      </Stack>
    </Box>
  );
};
export default CustomerFinancialReports;

