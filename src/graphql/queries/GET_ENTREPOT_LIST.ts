import { gql } from "@apollo/client";

const GET_ENTREPOT_LIST = gql`
  query ($page: Int, $searchTerm: String) {
    getEntrepotList(page: $page, searchTerm: $searchTerm) {
      entrepot {
        _id
        name
        address
        responsible {
          _id
          name
        }
      }
      count
    }
  }
`;

export { GET_ENTREPOT_LIST };
