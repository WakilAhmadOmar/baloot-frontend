
import  createUploadLink  from "apollo-upload-client/createUploadLink.mjs";
import { ACCESS_TOKEN_KEY } from "../libs/constants";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getAuthUser } from "@/utils/getAuthUser";
import { getSession } from "next-auth/react";


const graphqlEndPoint = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1/graphql"


  const httpLink = new HttpLink({
    uri: graphqlEndPoint,
  });

  const uploadHttpLink: any = createUploadLink({
    uri: graphqlEndPoint,
  });
  const authLink = setContext(async (_, { headers }) => {
    const {token }:any = await getSession();
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const access = token?.data?.signIn?.accessToken;
    // const xApiKey = await process.env.REACT_APP_X_API_KEY;
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${access}`,
        // "x-api-key": xApiKey,
      },
    };
  });
  let isRefreshing = false;
  let pendingRequests: any = [];
  const getTokenFunction = async () => {
    // try {
    //   const variables = {
    //     refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    //   };
    //   
    //   const tokenRefresh = await client.mutate({
    //     mutation: REFRESH_TOKEN,
    //     variables,
    //   });
    //   
    //   if (tokenRefresh?.data?.refreshToken?.accessToken) {
    //     localStorage.setItem(
    //       ACCESS_TOKEN_KEY,
    //       tokenRefresh?.data?.refreshToken?.accessToken
    //     );
    //     localStorage.setItem(
    //       REFRESH_TOKEN_KEY,
    //       tokenRefresh?.data?.refreshToken?.refreshToken
    //     );
    //     // setUserInfo(tokenRefresh?.data?.refreshToken?.userInfo)
    //     return tokenRefresh?.data?.refreshToken?.accessToken;
    //   }
    // } catch (error: any) {
    //   
    //   if (
    //     error?.message === "invalid signature" ||
    //     error?.message === "jwt expired" ||
    //     error.message === "invalid token"
    //   ) {
    //     setIsLogin(false);
    //     localStorage.removeItem(ACCESS_TOKEN_KEY);
    //     localStorage.removeItem(REFRESH_TOKEN_KEY);
    //   }
    //   // if(error.message === "Not authenticated.") return
    //   // return message.error(error.message)
    // }
  };
  const resolvePendingRequests = () => {
    //@ts-ignore
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
  };
  const errorLink = onError(
    //@ts-ignore
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          //@ts-ignore
          switch (err.message) {
            case "Not authenticated.":
              let forward$;
              if (!isRefreshing) {
                isRefreshing = true;
                forward$ = fromPromise(
                  getTokenFunction()
                    .then((data) => {
                      // Store the new tokens for your auth link
                      resolvePendingRequests();
                      isRefreshing = false;
                      return data;
                    })
                    .catch((error) => {
                      pendingRequests = [];
                      // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                      return;
                    })
                    .finally(() => {
                      isRefreshing = false;
                    })
                ).filter((value: any) => Boolean(value));
              } else {
                // Will only emit once the Promise is resolved
                forward$ = fromPromise(
                  new Promise((resolve: any) => {
                    pendingRequests.push(() => resolve());
                  })
                );
              }

              //@ts-ignore
              return forward$.flatMap(() => {
                const access = localStorage.getItem(ACCESS_TOKEN_KEY);
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: `Bearer ${access}`,
                  },
                });
                return forward(operation);
              });

            case "UNAUTHORIZED":
              //
              // dispatch(loginAction(false))
              // history.push("/blacklistPage")
              if (graphQLErrors?.[0]?.message.includes("بلاک")) {
                // dispatch(companyInfoAction({ isBlocked: true }))
              } else {
                // const data: ShowMessageBarDataType = {
                //   showError: true,
                //   textErrorMessage: graphQLErrors?.[0]?.message,
                //   typeMessage: "error"
                // }
                // dispatch(ShowMessageBarAction(data))
              }
              return;
            default:
              // const data: ShowMessageBarDataType = {
              //   showError: true,
              //   textErrorMessage: graphQLErrors?.[0]?.message,
              //   typeMessage: "error"
              // }
              // dispatch(ShowMessageBarAction(data))
              return;
          }
        }
      }
      if (networkError) {
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
          },
        });
        return forward(operation);
      }
    }
  );

  export const client = new ApolloClient({

    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, errorLink, uploadHttpLink, httpLink]),
    // link: ApolloLink.from([restLink, httpLink]),
  });


