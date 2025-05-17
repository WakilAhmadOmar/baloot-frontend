
import { gql } from "@apollo/client"

const UPDATE_CONSUMPTION = gql`
mutation UpdateConsumption($consumptionId: ID!, $consumptionObject: ConsumptionObjectInput!) {
  updateConsumption(consumptionId: $consumptionId, consumptionObject: $consumptionObject) {
    _id
  }
}
`
export { UPDATE_CONSUMPTION } 