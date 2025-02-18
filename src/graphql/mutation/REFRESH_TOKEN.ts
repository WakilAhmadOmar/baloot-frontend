import { gql } from "@apollo/client";

 
 const REFRESH_TOKEN = gql`
 mutation($refreshToken: String!){
    refreshToken(refreshToken: $refreshToken ){
      accessToken
      refreshToken
    }
  }
 `
export { REFRESH_TOKEN }