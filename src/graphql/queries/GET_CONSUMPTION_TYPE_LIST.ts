import { gql } from "@apollo/client";

const GET_CONSUMPTION_TYPE_LIST = gql`
  query {
    getConsumptionTypeList {
      _id
      name
      createdAt
      isUsed
    }
  }
`;
export { GET_CONSUMPTION_TYPE_LIST };
