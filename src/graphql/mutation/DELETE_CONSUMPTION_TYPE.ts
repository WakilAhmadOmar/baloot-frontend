import { gql } from "@apollo/client";

const DELETE_CONSUMPTION_TYPE = gql`
mutation DeleteConsumptionType($consumptionTypeId: ID!) {
  deleteConsumptionType(consumptionTypeId: $consumptionTypeId) {
    _id
    name
  }
}

`
export {DELETE_CONSUMPTION_TYPE}