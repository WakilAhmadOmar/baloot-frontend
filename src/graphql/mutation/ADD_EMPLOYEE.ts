import { gql } from "@apollo/client";

const ADD_EMPLOYEE = gql`
  mutation ($employeeObject: EmployeeObjectInput!) {
    addEmployee(employeeObject: $employeeObject) {
      _id
    }
  }
`;

export { ADD_EMPLOYEE };
