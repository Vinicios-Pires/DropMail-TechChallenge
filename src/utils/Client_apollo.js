import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const AUTH_TOKEN = "tokensuperseguroRS"
const CORS = 'https://cors-anywhere.herokuapp.com/'

const client = new ApolloClient({
  uri: `${CORS}https://dropmail.me/api/graphql/${AUTH_TOKEN}`,
  fetchOptions: {
    mode: 'cors',
  },
  headers: {
    ContentType: 'text/json'
  },
  cache: new InMemoryCache(),
});

export const GENERATE_EMAIL = gql`
  mutation {
    introduceSession {
      id,
      expiresAt,
      addresses {
        address
      }
    }
  }
`

export default client;