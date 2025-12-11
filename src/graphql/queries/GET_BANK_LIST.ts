import { gql } from "@apollo/client";

const GET_BANK_LIST = gql`
  query  {
    getBankList {
        _id
        firstPeriodCredit {
          amount
          creditType
          currencyId {
            _id
            name
            symbol
          }
        }
        name
        accountNumber
        bankPhoneNumber
        createdAt
        description
      }
     
  }
`;
export { GET_BANK_LIST };
