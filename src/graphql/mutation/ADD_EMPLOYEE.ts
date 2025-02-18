import { gql } from "@apollo/client";

const ADD_EMPLOYEE = gql`
  mutation ($employeeObject: EmployeeObjectInput!) {
    addEmployee(employeeObject: $employeeObject) {
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
          symbol
        }
      }
      startDate
      dateOfBirth
      email
      phoneNumber
      address
      image
      updatedAt
    }
  }
`;

export { ADD_EMPLOYEE };
