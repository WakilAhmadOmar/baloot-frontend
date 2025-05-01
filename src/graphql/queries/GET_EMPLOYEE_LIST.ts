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
         credit {
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
        startDate
        dateOfBirth
        email
        phoneNumber
        address
        image
      }
      count
    }
  }
`;

export { GET_EMPLOYEE_LIST };
