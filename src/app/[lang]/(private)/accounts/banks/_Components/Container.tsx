"use client";
import AddBanksAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import CustomSearch from "@/components/search/CustomSearch";
import { GET_BANK_LIST } from "@/graphql/queries/GET_BANK_LIST";
import { AppContext } from "@/provider/appContext";
import { useApolloClient } from "@apollo/client";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SkeletonComponent from "./Skeleton";
import { DELETE_BANK } from "@/graphql/mutation/DELETE_BANK";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { NotFoundIcon } from "@/icons";

interface IPropsBankAccountPages {
  t: any;
}

const BanksAccountsPage: React.FC<IPropsBankAccountPages> = ({ t }) => {
  const { setHandleError } = useContext(AppContext);
  const client = useApolloClient();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [textSearchState , setTextSearchState] = useState("")
  const [bankList, setBankList] = useState<any>({
    page: 1,
    data: [],
    count: 0,
  });
  const getBankListFunction = async (searchTerm?: string) => {
    setLoading(true)
    try {
      const variables = {
        page: searchTerm ? 1 : bankList?.page,
        ...(searchTerm ? { searchTerm: searchTerm } : {}),
      };
      const {
        data: { getBankList },
      } = await client.query({
        query: GET_BANK_LIST,
        variables,
      });

      if (getBankList?.bank) {
        const allBank = [
          ...bankList?.data,
          ...(getBankList?.bank?.length > 0 ? getBankList?.bank : []),
        ];
        const duplicate = allBank?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        setBankList((prevState: any) => ({
          page: searchTerm ? 1 : prevState.page + 1,
          count: getBankList?.count ? getBankList?.count : prevState?.count,
          data: searchTerm ? getBankList?.bank : duplicate,
        }));
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false)
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    }
  };
  useEffect(() => {
    if (bankList?.count === 0) {
      getBankListFunction();
    }
  }, []);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    try {
      const variables = {
        bankId: id,
      };
      const {
        data: { deleteBank },
      } = await client?.mutate({
        mutation: DELETE_BANK,
        variables,
      });
      if (deleteBank?.message) {
        setLoading(false);
        setBankList(bankList?.filter((item: any) => item?._id !== id));
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
    console.log("search" , search)
    setTextSearchState(search)
    if (search){

      getBankListFunction(search);
    }else {
      getBankListFunction()
    }
  };
  const handleUpdateBank = (bank:any) => {
    setBankList((prevState:any) => ({
      ...prevState,
      data:prevState?.data?.map((item:any) => {
        if (item?._id === bank?._id){
          return {
            ...item,
            credit:bank?.credit,
            description:bank?.description
          }
        }else return item
      })
    }))
  }
  return (
    <Box>
      {loading && <CircularProgressComponent />}
    
        <Typography variant="h3">
          {t?.pages?.bank?.list_of_previous_bank_accounts}
        </Typography>
      
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={4}
      
      >
        <Box display={"flex"} width={"100%"}>
          <AddBanksAccounts
            isEmptyPage={loadingPage === false && bankList?.count === 0}
            t={t}
            onUpdateBank={handleUpdateBank}
          />
        </Box>
        {( bankList?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
        !loadingPage &&
        bankList?.data?.length === 0 && (
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
      {bankList?.data?.length === 0 &&
        loadingPage &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
      <Box mt={2}>
        {bankList?.data?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              t={t}
              messageDescription={t?.pages?.bank?.delete_description}
              messageTitle={t?.pages?.bank?.delete_title}
              id={item?._id}
              editTable={false}
              getIdToAddAction={handleDeleteItem}
            >
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.account_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {" "}
                  {item?.accountNumber}
                </Typography>
              </Box>
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
                  {t?.pages?.bank?.phone_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.bankPhoneNumber}
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
      {bankList?.count > 0 && textSearchState === "" &&<Box display={"flex"} justifyContent={"flex-end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={bankList?.count / 10}
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
export default BanksAccountsPage;
