import { gql } from "@apollo/client";

const ADD_WARE_TO_ENTREPOT = gql`
mutation AddWareToEntrepot($entrepotId: ID!, $wareObject: [WareInput] , $isFirstPeriodWare:Boolean!) {
  addWareToEntrepot(entrepotId: $entrepotId, wareObject: $wareObject , isFirstPeriodWare:$isFirstPeriodWare) {
    _id
    name
  }
}
`

export { ADD_WARE_TO_ENTREPOT}