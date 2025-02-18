import { gql } from "@apollo/client";

const UPDATE_CONSUMPTION_TYPE = gql`
  mutation ($consumptionTypeId: ID!, $name: String!) {
    updateConsumptionType(consumptionTypeId: $consumptionTypeId, name: $name) {
      _id
      name
      createdAt
    }
  }
`;
export { UPDATE_CONSUMPTION_TYPE };
