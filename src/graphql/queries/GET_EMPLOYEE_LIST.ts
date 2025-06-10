import { gql } from "@apollo/client";

const GET_EMPLOYEE_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getEmployeeList(page: $page, searchTerm: $searchTerm) {
      employee {
        _id
        name
        fathersName
        idNumber
        jobTitle
        firstPeriodCredit {
          amount
          creditType
          currencyId {
            _id
            name
            symbol
          }
        }
        salary {
          amount
          currencyId {
            _id
            name
            symbol
          }
        }
          createdAt
        startDate
        dateOfBirth
        email
        phoneNumber
        address
      }
      count
    }
  }
`;

export { GET_EMPLOYEE_LIST };
