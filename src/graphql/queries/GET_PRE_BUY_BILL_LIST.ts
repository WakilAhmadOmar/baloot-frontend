import { gql } from "@apollo/client";

export const GET_PRE_BUY_BILL_LIST = gql`
  query GetPreBuyBillList(
    $page: Int
    $limit: Int
    $searchTerm: String
    $dateFilter: DateFilterInput
  ) {
    getPreBuyBillList(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      dateFilter: $dateFilter
    ) {
      count
      buyBill {
        _id
        customerId {
          _id
          fullName
        }
        billNumber
        createdAt
        billDate
        status
      }
    }
  }
`;
