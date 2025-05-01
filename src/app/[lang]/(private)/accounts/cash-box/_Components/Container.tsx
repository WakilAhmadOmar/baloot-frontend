"use client";
import AddCashboxAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import CustomSearch from "@/components/search/CustomSearch";
import { AppContext } from "@/provider/appContext";
import { useApolloClient } from "@apollo/client";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SkeletonComponent from "./Skeleton";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { NotFoundIcon } from "@/icons";
import { GET_SAFE_LIST } from "@/graphql/queries/GET_SAFE_LIST";
import { DELETE_SAFE } from "@/graphql/mutation/DELETE_SAFE";

interface IPropsBankAccountPages {
  t: any;
}

const CashboxPage: React.FC<IPropsBankAccountPages> = ({ t }) => {
  const { setHandleError } = useContext(AppContext);
  const client = useApolloClient();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [textSearchState , setTextSearchState] = useState("")
  const [cashboxList, setCashboxList] = useState<any>({
    page: 1,
    data: [],
    count: 0,
  });
  const getCashboxListFunction = async (searchTerm?: string) => {
    setLoadingPage(true)
    try {
      const variables = {
        page: searchTerm ? 1 : cashboxList?.page,
        ...(searchTerm ? { searchTerm: searchTerm } : {}),
      };
      const {
        data: { getSafeList },
      } = await client.query({
        query: GET_SAFE_LIST,
        variables,
      });

      if (getSafeList?.safe) {
        const allBank = [
          ...cashboxList?.data,
          ...(getSafeList?.safe?.length > 0 ? getSafeList?.safe : []),
        ];
        const duplicate = allBank?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        setCashboxList((prevState: any) => ({
          page: searchTerm ? 1 : prevState.page + 1,
          count: getSafeList?.count ? getSafeList?.count : prevState?.count,
          data: searchTerm ? getSafeList?.safe : duplicate,
        }));
      }
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false)
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    }
  };
  useEffect(() => {
    if (cashboxList?.count === 0) {
      getCashboxListFunction();
    }
  }, []);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    try {
      const variables = {
        safeId: id,
      };
      const {
        data: { deleteSafe },
      } = await client?.mutate({
        mutation: DELETE_SAFE,
        variables,
      });
      if (deleteSafe?.message) {
        setLoading(false);
        setCashboxList(cashboxList?.filter((item: any) => item?._id !== id));
      }
    } catch (error: any) {
      setLoading(false);
      setHandleError({
        message: error?.message,
        type: "error",
        open: true,
      });
    }
  };
  const handleSearchItem = (search: string) => {
    setTextSearchState(search)
    if (search){

      getCashboxListFunction(search);
    }else {
      getCashboxListFunction()
    }
  };

  const handleUpdateCashbox = (cashbox:any) => {
    setCashboxList((prevState:any) => ({
      ...prevState,
      data:prevState?.data?.map((item:any) => {
        if (item?._id === cashbox?._id){
          return {
            ...item,
            credit:cashbox?.credit,
            description:cashbox?.description
          }
        }else return item
      })
    }))
  }

  return (
    <Box>
    
        <Typography variant="h3">
          {t?.pages?.cashbox?.record_previous_cashbox_accounts}
        </Typography>
      
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={4}
      
      >
        <Box display={"flex"} width={"100%"}>
          <AddCashboxAccounts
            isEmptyPage={loadingPage === false && cashboxList?.count === 0}
            t={t}
            onUpdateCashbox={handleUpdateCashbox}
          />
        </Box>
        {( cashboxList?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
        !loadingPage &&
        cashboxList?.data?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.product?.nothing_found}
            </Typography>
          </Box>
        )}
      {cashboxList?.data?.length === 0 &&
        loadingPage &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
      <Box mt={2}>
        {cashboxList?.data?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              t={t}
              messageDescription={t?.pages?.cashbox?.delete_description}
              messageTitle={t?.pages?.cashbox?.delete_title}
              id={item?._id}
              editTable={false}
              getIdToAddAction={handleDeleteItem}
            >
              
              {item?.credit?.map((credit: any, index: number) => {
                return (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"15rem auto"}
                    key={credit?.amount + index}
                  >
                    <Typography variant="caption" pt={2}>
                      {credit?.creditType}
                    </Typography>
                    <Typography variant="caption" pt={2}>
                      {" "}
                      {credit?.amount} {credit?.currencyId?.symbol}{" "}
                    </Typography>
                  </Box>
                );
              })}
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.cashbox?.Cashier}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.cashier?.name}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.phone_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.cashier?.phoneNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={" auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.description}
                </Typography>
                <Typography variant="caption">{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      {cashboxList?.count > 0 && textSearchState === "" &&<Box display={"flex"} justifyContent={"flex-end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={cashboxList?.count / 10}
            size={"medium"}
            // onChange={handleChangePage}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>
      </Box>}
    </Box>
  );
};
export default CashboxPage;
