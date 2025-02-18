import { gql } from "@apollo/client";

const ADD_BUY_BILL = gql`
  mutation ($buyBillObject: BuyBillObjectInput!) {
    addBuyBill(buyBillObject: $buyBillObject) {
  _id
  customerId{
    _id
    name
    fathersName
  }
  billNumber
  billDate
  entrepotId{
    _id
    name
    address
  }
  billCurrencyId{
    _id
    name
    symbol
  }
  billProducts{
    productId{
      _id
      name
      measures{
        measureId{
          _id
          name
        }
        buyPrice
      }
      
    }
  }
  productsCount
  totalPriceOfBill
  consumptionPrice
  createdAt
    }
  }
`;

export { ADD_BUY_BILL };
