import { gql } from "@apollo/client";


const GET_TOTAL_FIXED_ASSETS_REPORT = gql`
query GetTotalFixedAssetsReport {
  getTotalFixedAssetsReport {
    currencyId {
      name
      _id
      symbol
    }
    totalAmount
  }
}
`
export {GET_TOTAL_FIXED_ASSETS_REPORT}