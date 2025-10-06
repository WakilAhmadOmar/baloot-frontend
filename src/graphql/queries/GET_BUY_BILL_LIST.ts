import { gql } from "@apollo/client";


const GET_BUY_BILL_LIST = gql`
query GetBuyBillList($page: Int, $searchTerm: String, $dateFilter: DateFilterInput) {
  getBuyBillList(page: $page, searchTerm: $searchTerm, dateFilter: $dateFilter) {
  buyBill {
    _id
   customerId {
    _id
    fullName
    
   }
    billNumber
billDate
  }
  count

  }
}
`

export {GET_BUY_BILL_LIST}