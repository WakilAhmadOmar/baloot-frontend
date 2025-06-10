import { gql } from "@apollo/client";

const GET_CUSTOMER_PAY_OFF_LIST = gql`
  query getCustomerPayOffList($page: Int) {
    getCustomerPayOffList(page: $page) {
      count
      customerPayOff {
        _id
        amount
        amountCalculated
        calculatedTo {
          _id
          name
          symbol
        }
        createdAt
        currencyId {
          _id
          name
          symbol
        }
        description
        invoiceType
        payerId {
          _id
          name
        }
        payerType
        receiver {
          _id
          fullName
        }
      }
    }
  }
`;
export { GET_CUSTOMER_PAY_OFF_LIST };
