"use client";
import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useGetEmployeeListQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-list-query";
interface IProps {
  dir?: string;
  name?: string;
  getEmployee?:(employee:any)=> void

}

const EmployeeAutoCompleteComponent: React.FC<IProps> = ({
  dir="ltr",
  name,
  getEmployee
}) => {
  const {
    formState: { errors },
    control,
    watch,
    setValue
  } = useFormContext();


  const { data:getEmployeeList } = useGetEmployeeListQuery()

  const value = watch(name || "employeeId")
   useEffect(() => {
     if (getEmployeeList?.employee?.length && !value) {
       const defaultCustomer = getEmployeeList?.employee[0];
       setValue(name || "employeeId", defaultCustomer._id);
      //  if (getEmployee) {
      //    getEmployee(defaultCustomer);
      //  }
     }
   }, [getEmployeeList, setValue, getEmployee, name, value]);

  return (
    <>
        <Controller
          name={name || "employeeId"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value}
              error={!!errors?.[name || "employeeId"]}
              required
              onChange={(event)=> {
                onChange(event)
                if (getEmployee){
                  const selectedOption = getEmployeeList?.employee?.find((item:any) => item?._id === event.target.value);
                  getEmployee(selectedOption)
                }
              }}
            >
              {getEmployeeList?.employee?.map((item:any) => {
                return (
                  <MenuItem
                    key={item?._id}
                    value={item?._id}
                    dir={dir}
                  >
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      
    </>
  );
};

export default EmployeeAutoCompleteComponent;
