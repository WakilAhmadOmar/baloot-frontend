import { gql } from "@apollo/client";

const GET_RECEIVE_LIST = gql`
query Receive($payerType: PayerTypeForReceiveEnum!, $page: Int) {
  getReceiveList(payerType: $payerType, page: $page) {
    receive {
      _id
      payerType
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
export { GET_RECEIVE_LIST };
