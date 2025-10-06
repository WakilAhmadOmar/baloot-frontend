import { gql } from "@apollo/client";


const GET_BUY_BILL_BY_ID = gql`
query GetBuyBillById($billId: ID!) {
  getBuyBillById(billId: $billId) {
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
    }
    products {
      productId {
        _id
        name
        price {
          buyPrice
           measureId {
            _id
           }
           sellPrice
        }
      }
      productMeasures {
        measureId {
          _id
          name
        }
        amountOfProduct
        pricePerMeasure
        consumptionPrice
      }
      expireInDate
    }
    totalPriceOfBillAfterConsumption
    status
    createdAt
  }
}
`
export {GET_BUY_BILL_BY_ID}