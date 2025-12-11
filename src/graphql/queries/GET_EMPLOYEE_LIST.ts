import { gql } from "@apollo/client";

const GET_EMPLOYEE_LIST = gql`
query GetEmployeeList {
  getEmployeeList {
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
    contactNumber
    address
    firstPeriodCredit {
      creditType
      amount
      currencyId {
        symbol
        name
        _id
      }
    }
    description
    createdAt
    updatedAt
  }
}
`;

export { GET_EMPLOYEE_LIST };
