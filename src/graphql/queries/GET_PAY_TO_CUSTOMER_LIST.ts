import { gql } from "@apollo/client";

const GET_PAY_TO_CUSTOMER_LIST = gql`
  query getPayToCustomerList($page: Int , $filter:PayOffInvoiceType!) {
    getPayToCustomerList(page: $page , filter:$filter) {
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
export { GET_PAY_TO_CUSTOMER_LIST };
