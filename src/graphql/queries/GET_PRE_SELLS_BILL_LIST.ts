import { gql } from "@apollo/client";

const GET_PRE_SELLS_BILL_LIST = gql`
query GetPreSellsBillList($page: Int, $limit: Int, $searchTerm: String, $dateFilter: DateFilterInput) {
  getPreSellsBillList(page: $page, limit: $limit, searchTerm: $searchTerm, dateFilter: $dateFilter) {
    sellBill {
      _id
      customerId {
        _id
        fullName
      }
      billNumber
      billDate
      createdAt
    }
  }
}
`
export {GET_PRE_SELLS_BILL_LIST}