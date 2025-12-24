import { gql } from "@apollo/client";

const UPDATE_EMPLOYEE = gql`
  mutation ($employeeId: ID!, $employeeObject: EmployeeObjectInput!) {
    updateEmployee(employeeId: $employeeId, employeeObject: $employeeObject) {
      _id
      name
      fathersName
      idNumber
      jobTitle
      salary {
        amount
        currencyId {
          _id
          name
        }
      }
      startDate
      dateOfBirth
      email
      address
      createdAt
    }
  }
`;
export { UPDATE_EMPLOYEE };
