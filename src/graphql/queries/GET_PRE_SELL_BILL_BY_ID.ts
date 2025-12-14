import { gql } from "@apollo/client";


const GET_PRE_SELL_BILL_BY_ID = gql`
query GetPreSellsBillById($billId: ID!) {
  getPreSellsBillById(billId: $billId) {
    _id
    customerId {
      _id
      fullName
    }
    billNumber
    billDate
    entrepotId {
      _id
      name
    }
    currencyId {
      _id
      name
      symbol
    }
    products {
      productId {
        _id
        name
        productCode
        measures {
          measureId {
            _id
            name
          }
        }
        price {
          measureId {
            _id
            name
          }
          buyPrice
          sellPrice
        }
        currencyId {
          _id
          name
          symbol
        }
        isUsed
        createdAt
      }
    }
  }
}
`
export {GET_PRE_SELL_BILL_BY_ID}