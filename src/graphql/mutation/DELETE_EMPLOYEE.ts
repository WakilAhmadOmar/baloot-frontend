import { gql } from "@apollo/client";

const DELETE_EMPLOYEE = gql`
  mutation ($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId) {
      message
    }
  }
`;
export { DELETE_EMPLOYEE };
