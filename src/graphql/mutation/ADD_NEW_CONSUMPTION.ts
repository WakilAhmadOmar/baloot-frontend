import { gql } from "@apollo/client";


const ADD_NEW_CONSUMPTION = gql`
mutation AddNewConsumption($consumptionObject: ConsumptionObjectInput!) {
  addNewConsumption(consumptionObject: $consumptionObject) {
    _id
    amount
  }
}
`

export { ADD_NEW_CONSUMPTION }