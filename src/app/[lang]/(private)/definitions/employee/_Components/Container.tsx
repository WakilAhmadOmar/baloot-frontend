"use client"
import CreateEmployee from "./Create";
import {  EmptyProductPageIcon } from "@/icons";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useGetEmployeeListQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-list-query";
import CollapseComponent from "@/components/collapse/Collapse";
import EmployeeDetails from "./Details";
import SkeletonComponent from "../../_Components/Skeleton";
import EmptyPage from "@/components/util/emptyPage";
import UpdateEmployee from "./Update";
import { useDeleteEmployeeMutation } from "@/hooks/api/definitions/employee/mutations/use-delete-mutation";
import { AppContext } from "@/provider/appContext";

interface IProps {
    t:any
}
const EmployeePage:React.FC<IProps> = ({t}) => {
  const {setHandleError} = useContext(AppContext)
 
  const [page , setPage] = useState(1)

  const {data:employeeList , isLoading} = useGetEmployeeListQuery({page})
  const {mutate , isLoading:deleteIsLoading} = useDeleteEmployeeMutation()

  const handleDeleteFunction = (employeeId:string) => {
     mutate({employeeId}, {
      onSuccess: ({message}) => {
        setHandleError({
          open: true,
          message,
          status: "success",
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error.message,
          status: "error",
        });
      },
    });
  }


   const handleChangePage = (
      event: React.ChangeEvent<unknown>,
      page: number
    ) => {
      setPage(page)
    };
  return (
    <Box>
        <Typography variant="h3" mb={2}>
          {t?.pages?.employee?.employees}
        </Typography>
      <Box
        mb={2}
        sx={{
          display: "flex",
          
        }}
      >
        <CreateEmployee
          t={t}
        />
        {/* {employeeState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t} />
          </Box>
        )} */}
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        employeeState?.employees?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.pages?.employee?.employees}
            </Typography>
          </Box>
        )} */}
           {employeeList?.employee?.map((item:any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              id={item?._id}
              getIdToAddAction={handleDeleteFunction}
              UpdateComponent= {<UpdateEmployee t={t} item={item} />}
              editTable
              t={t}
              messageDescription={t?.pages?.employee?.delete_description}
              messageTitle={t?.pages?.employee?.delete_title}
              isLoading={deleteIsLoading}
            >
              <Grid container spacing={2}>
                <Grid item xs={9} display="grid">
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"17rem auto"}
                    rowGap={"1rem"}
                  >
                    <Typography variant="caption">{t?.pages?.employee?.job_title}</Typography>
                    <Typography variant="caption">{item?.jobTitle}</Typography>
                    <Typography variant="caption">{t?.pages?.employee?.salary_amount}</Typography>
                    <Typography variant="caption">
                      {item?.salary?.amount}
                    </Typography>
                    <Typography variant="caption">{t?.pages?.employee?.phone_number}</Typography>
                    <Typography variant="caption">{item?.phoneNumber}</Typography>
                    <Typography variant="caption">{t?.pages?.employee?.email}</Typography>
                    <Typography variant="caption">{item?.email}</Typography>
                  </Box>
                </Grid>
  
                <Grid
                  item
                  xs={3}
                  justifyContent={"flex-end"}
                  display="flex"
                  alignItems={"flex-end"}
                >
                  <Box>
                    <EmployeeDetails item={item} t={t}/>
                  </Box>
                </Grid>
              </Grid>
            </CollapseComponent>
          );
        })}
        {employeeList?.count > 9 && <Stack spacing={2} p={2} display={"grid"} justifyContent={"end"}>
          <Pagination
            count={Math.ceil(employeeList?.count / 10)}
            size={"medium"}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>}
        {isLoading && <SkeletonComponent />}
        {employeeList?.count === 0  && !isLoading && <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.employee.no_product_yet_title}
            discription={t.pages?.employee.no_product_yet_discription}
            // buttonText={t.pages?.employee.add_new_employee}
            // onClick={handleOpenDialogFunction}
          />
        </Box>}
    </Box>
  );
};

export default EmployeePage;
