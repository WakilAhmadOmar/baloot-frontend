import { gql } from "@apollo/client";

const GET_CONSUMPTION_REPORT = gql`
query GetConsumptionReport {
  getConsumptionReport {
    currencyId {
      name
      _id
    }
    totalAmount
  }
}
`
export { GET_CONSUMPTION_REPORT }