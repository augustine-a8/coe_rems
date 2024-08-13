import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "../hooks";

export default function ApolloWrapper({
  children,
}: {
  children: React.JSX.Element;
}) {
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const httpLink = createHttpLink({
    uri: apiUrl,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
