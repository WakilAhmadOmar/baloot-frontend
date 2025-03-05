import { gql } from "@apollo/client";

const DELETE_CONSUMPTION = gql`
mutation($consumptionId: ID!){
  deleteConsumption(consumptionId: $consumptionId) {
    message
  }
}
`
export  {DELETE_CONSUMPTION}