import { gql } from "@apollo/client";

const DELETE_CONSUMPTION = gql`
mutation DeleteConsumption($consumptionId: ID!) {
  deleteConsumption(consumptionId: $consumptionId) {
    message
  }
}
`
export  {DELETE_CONSUMPTION}