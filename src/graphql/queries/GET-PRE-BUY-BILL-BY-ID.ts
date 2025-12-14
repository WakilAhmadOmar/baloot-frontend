import { gql } from "@apollo/client";


const GET_PRE_BUY_BILL_BY_ID = gql`
query GetPreBuyBillById($billId: ID!) {
  getPreBuyBillById(billId: $billId) {
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
            name
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
export {GET_PRE_BUY_BILL_BY_ID}