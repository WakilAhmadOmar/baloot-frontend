import { gql } from "@apollo/client";

const GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID = gql`
query GetCustomerReportsByCustomerId($customerId: ID!, $page: Int) {
  getCustomerReportsByCustomerId(customerId: $customerId, page: $page) {
    count
    list {
      _id
      receiver {
        _id
        fullName
        name
      }
      payerId {
        _id
        fullName
        name
      }
      currencyId {
        _id
        name
        symbol
      }
      amount
      calculatedTo {
        _id
        name
        symbol
      }
      amountCalculated
      invoiceType
      billId {
        _id
      }
      description
      payerType
      receiverType
      createdAt
      updatedAt
    }
  }
}
`

export {GET_CUSTOMER_REPORTS_BY_CUSTOMER_ID}