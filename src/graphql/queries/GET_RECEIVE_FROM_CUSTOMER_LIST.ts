import { gql } from "@apollo/client";

const GET_RECEIVE_FROM_CUSTOMER_LIST = gql`
query getReceiveFromCustomerList( $page: Int , $filter:ReceiveInvoiceType!) {
  getReceiveFromCustomerList( page: $page , filter: $filter) {
    receive {
      _id
      receiver {
        _id
        name
      }
      payerId {
        _id
        name
        fullName
      }
      currencyId {
        _id
        name
        symbol
      }
      amount
      calculatedTo {
        name
        _id
        symbol
      }
      amountCalculated
      invoiceType
      description
      receiverType
      createdAt
    }
    count
  }
}
`;
export { GET_RECEIVE_FROM_CUSTOMER_LIST };
