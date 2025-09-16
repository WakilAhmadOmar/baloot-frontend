import { gql } from "@apollo/client";

const GET_SELLS_BILL_BY_ID = gql`
  query GetSellsBillById($billId: ID!) {
    getSellsBillById(billId: $billId) {
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
        name
        _id
        symbol
      }
      products {
        productId {
          _id
          name
        }
        productMeasures {
          measureId {
            _id
            name
          }
          amountOfProduct
          pricePerMeasure
          discountPercentage
        }
        entrepotId {
          _id
          name
        }
        expireInDate
      }
      totalPriceAfterDiscount
      transactionId {
        _id
      }
      createdAt
    }
  }
`;
export { GET_SELLS_BILL_BY_ID };
