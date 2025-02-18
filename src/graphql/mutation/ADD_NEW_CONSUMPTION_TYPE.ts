import { gql } from "@apollo/client";

const ADD_NEW_CONSUMPTION_TYPE = gql`
  mutation ($name: String!) {
    addNewConsumptionType(name: $name) {
      _id
      name
      createdAt
    }
  }
`;
export { ADD_NEW_CONSUMPTION_TYPE };
