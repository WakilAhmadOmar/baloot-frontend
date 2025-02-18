import { gql } from "@apollo/client";

const GET_BANK_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getBankList(page: $page, searchTerm: $searchTerm) {
      bank {
        _id
        name
        accountNumber
        bankPhoneNumber
        cridet {
          amount
          currencyId {
            _id
            name
          }
        }
        createdAt
      }
      count
    }
  }
`;
export { GET_BANK_LIST };
