import { gql } from "@apollo/client";

const GET_BUY_BILL_BY_ID = gql`
  query GetBuyBillById($billId: ID!) {
    getBuyBillById(billId: $billId) {
      _id
      products {
        productId {
          _id
          name
          measures {
            measureId {
              _id
              name
            }
          }
          price {
            buyPrice
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
      totalPriceOfBillAfterConsumption
      status
      createdAt
      isPaid
    }
  }
`;
export { GET_BUY_BILL_BY_ID };
