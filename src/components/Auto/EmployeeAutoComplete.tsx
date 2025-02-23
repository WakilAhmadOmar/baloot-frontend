import { useApolloClient } from "@apollo/client";
import { Autocomplete, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";
interface IProps {
  value?: string | number;
  name?: string;
  getValue?: (data: any) => void;
  register?: any;
}

const EmployeeAutoCompleteComponent: React.FC<IProps> = ({
  getValue,
  value,
  name,
  register,
}) => {
  const theme = useTheme();
  const client = useApolloClient();
  const [optionsAuto, setOptionAuto] = useState<{
    page: number;
    options: {
      id: string;
      name: string;
    }[];
  }>({
    page: 1,
    options: [],
  });

  const getProductsFunction = async (searchTerm?: string) => {
    try {
      const variables = {
        ...(searchTerm
          ? { searchTerm: searchTerm }
          : { page: optionsAuto?.page }),
      };
      const {
        data: { getEmployeeList },
      } = await client.query({
        query: GET_EMPLOYEE_LIST,
        variables,
      });
      const allCustomer = [
        ...optionsAuto?.options,
        ...getEmployeeList?.employee,
      ];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
      setOptionAuto((prevState) => ({
        page: prevState?.page + 1,
        options: duplicate,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!optionsAuto?.options?.length) {
      getProductsFunction();
    }
  }, []);
  const debounceFunction = debounce(async (data: string) => {
    if (data) {
      getProductsFunction(data);
    }
  }, 500);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceFunction(event?.currentTarget?.value);
  };
  const handleSelectItem = (event: any, value: any) => {
    if (getValue) getValue(value);
  };
  return (
    <>
      {optionsAuto?.options?.length > 0 ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={optionsAuto?.options}
          // defaultValue={optionsAuto?.options?.[0]}
          onChange={handleSelectItem}
          getOptionLabel={(option: any) => option.name}
          // value
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              {...register(name, { required: true })}
              onChange={handleChange}
              name={name}
              fullWidth={true}
              sx={{
                maxWidth: "90%",

                //   "& .MuiInputBase-sizeSmall": {
                //     paddingRight: "10px",
                //   },
                //   "& .MuiAutocomplete-endAdornment": {
                //     display: "none",
                //   },
                //   "& label.Mui-focused": {
                //     color: "white",
                //   },
                //   "& .MuiInput-underline:after": {
                //     borderColor: theme.palette.grey[200],
                //   },
                //   "& .MuiOutlinedInput-root": {
                //     paddingRight: "10px !important",
                //     "& fieldset": {
                //       borderColor: "white",
                //     },
                //     "&:hover fieldset": {
                //       borderColor: "white",
                //     },
                //     "&.Mui-focused fieldset": {
                //       borderColor: theme.palette.grey[200],
                //     },
                //   },
              }}
              size="small"
            />
          )}
        />
      ) : null}
    </>
  );
};

export default EmployeeAutoCompleteComponent;
