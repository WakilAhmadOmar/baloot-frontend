import { gql } from "@apollo/client";

const GET_RECEIVE_LIST = gql`
  query GetReceiveList($page: Int) {
    getReceiveList(page: $page) {
      receive {
        _id
        receiver {
          _id
          name
        }

        amount
        currencyId {
          _id
          name
          symbol
        }
        customerId {
          _id
          fullName
        }

        calculatedTo {
          _id
          name
          symbol
        }
        amountCalculated
        createdAt
      }
      count
    }
  }
`;
export { GET_RECEIVE_LIST };
