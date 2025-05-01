import { gql } from "@apollo/client";

const GET_SELLS_BILL_LIST = gql`
query GetSellsBillList($page: Int, $searchTerm: String, $dateFilter: DateFilterInput) {
  getSellsBillList(page: $page, searchTerm: $searchTerm, dateFilter: $dateFilter) {
    sellBill {
      _id
      customerId {
        fullName
        _id
      }
      billNumber
      createdAt
    }
    count
  }
}
`
export {GET_SELLS_BILL_LIST}