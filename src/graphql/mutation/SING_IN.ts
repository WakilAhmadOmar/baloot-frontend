import { gql } from "@apollo/client";

const SIGN_IN = gql`
mutation($email:String! , $password:String!){
    signIn(email: $email , password: $password){
      accessToken
      refreshToken
      message
      userInfo{
        _id
        name
        createdAt
      }
    }
  }
`
export { SIGN_IN }