import { gql } from "@apollo/client";


const   GET_SELLS_BILL_BY_ID = gql`
query GetSellsBillById($billId: ID!) {
  getSellsBillById(billId: $billId) {
    _id
    customerId {
      _id
      fullName
      contactNumber
      address

    }
    billNumber
    billDate
    entrepotId {
      _id
      name
      address
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
          buyPrice
          measureId {
            _id
          }
          sellPrice
          
        }

      }
      measureId {
        _id
        name
        description
      }
      count
      pricePerMeasure
      entrepotId {
        _id
        name
        address
        responsible {
          _id
          name
        }
      }
      discountPercentage
    }
    totalPriceAfterDiscount
    transactionId {
      _id
      receiver {
        name
        _id
        address
      }
      customerId {
        _id
        fullName
        contactNumber
        address
      }
      currencyId {
        _id
        name
        symbol
      }
      amount
      calculatedTo {
        _id
        name
        symbol
      }
      amountCalculated
      invoiceType
      description
    }
    status
    isPaid
    createdAt
  }
}
`
export {GET_SELLS_BILL_BY_ID}