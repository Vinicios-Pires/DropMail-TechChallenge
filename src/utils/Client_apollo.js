import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";

const AUTH_TOKEN = "outrotokensuperseguroRS";
const CORS = "https://cors-anywhere.herokuapp.com/";

const client = new ApolloClient({
	uri: `${CORS}https://dropmail.me/api/graphql/${AUTH_TOKEN}`,
	fetchOptions: {
		mode: "cors",
	},
	headers: {
		ContentType: "text/json",
	},
	cache: new InMemoryCache(),
});

export const GENERATE_EMAIL = gql`
	mutation {
		introduceSession {
			id
			expiresAt
			addresses {
				address
			}
		}
	}
`;

export const CHECK_EMAIL = gql`
  query {
    session(id: "${sessionStorage.getItem("@SESSION_ID")}") {
      mails {
        rawSize,
        fromAddr,
        toAddr,
        downloadUrl,
        text,
        headerSubject
      }
    }
  }
`;

export function useCheckEmailQuery() {
	const CHECK_EMAIL = gql`
    query {
      session(id: "${sessionStorage.getItem("@SESSION_ID")}") {
        mails {
          rawSize,
          fromAddr,
          toAddr,
          downloadUrl,
          text,
          headerSubject
        }
      }
    }
  `;

	const { data, errors, loading } = useQuery(CHECK_EMAIL);

	return { data, errors, loading };
}

export default client;
