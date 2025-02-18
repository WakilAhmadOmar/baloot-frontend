import { gql } from "@apollo/client";

const GET_SAFE_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getSafeList(page: $page, searchTerm: $searchTerm) {
    safe{
      _id
      name
      address
      cashier{
        _id
        name
      }
      cashierPhoneNumber
      credit{
        creditType
        amount
        currencyId{
          _id
          name
        }
      }
    }
    count
    }
  }
`;
export { GET_SAFE_LIST };
