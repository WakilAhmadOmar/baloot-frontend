"use client";
import AddCashboxAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import { AppContext } from "@/provider/appContext";
import { Box, Typography } from "@mui/material";
import { useContext,  useState } from "react";
import SkeletonComponent from "./Skeleton";

import { EmptyProductPageIcon } from "@/icons";
import { useGetEmployeeListQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-list-query";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import EmptyPage from "@/components/util/emptyPage";
import { UpdateEmployeeAccounts } from "./Update";
import { useTranslations } from "next-intl";


const EmployeePage = () => {
  const t = useTranslations("pages")
  const { setHandleError } = useContext(AppContext);

  const { data: employeeList, isLoading } = useGetEmployeeListQuery();

  const { mutate: addFirstPeriodMutation, isLoading: deleteLoading } =
    useAddFirstPeriodOfCreditMutation();

  const handleDeleteAccount = (id: string) => {
    const variables = {
      creditObject: [],
      accountType: "Employee",
      accountId: id,
    };

    addFirstPeriodMutation(variables, {
      onSuccess: ({ message }: any) => {
        setHandleError({
          message: message ?? "",
          type: "success",
          open: true,
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          type: "error",
        });
      },
    });
  };

  return (
    <Box>

      <Typography variant="h3">
        {t("employee.list_of_employee_accounts")}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"} mt={4}>
        <Box display={"flex"} width={"100%"}>
          <AddCashboxAccounts />
        </Box>
        {/* {( employeeDetails?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )} */}
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        employeeDetails?.data?.length === 0 && (
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
        )} */}

      {employeeList?.length === 0 && !isLoading && (
        <Box
          className={"empty_page_content"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          display={"grid"}
        >
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("employee.no_product_yet_title")}
            discription={t("employee.no_product_yet_discription")}
            // buttonText={t.pages?.Customers.add_new_customer}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}

      <Box mt={2}>
        {employeeList?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              messageDescription={t("employee.delete_description_account")}
              messageTitle={t("employee.delete_title_account")}
              id={item?._id}
              editTable={true}
              getIdToAddAction={handleDeleteAccount}
              isLoading={deleteLoading}
              UpdateComponent={<UpdateEmployeeAccounts item={item} />}
            >
              {item?.firstPeriodCredit?.map((credit: any, index: number) => {
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
                  {t("employee.salary_amount")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.salary?.amount} {item?.salary?.currencyId?.symbol}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t("Customers.contact_number")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.contactNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t("Customers.address")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.address}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={" auto"}>
                <Typography variant="caption" pt={2}>
                  {t("bank.description")}
                </Typography>
                <Typography variant="caption">{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      {isLoading &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
    </Box>
  );
};
export default EmployeePage;
