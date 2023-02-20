import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";

(function () {
	var cors_api_host = "cors-anywhere.herokuapp.com";
	var cors_api_url = "https://" + cors_api_host + "/";
	var slice = [].slice;
	var origin = window.location.protocol + "//" + window.location.host;
	var open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function () {
		var args = slice.call(arguments);
		var targetOrigin = /^https?:\/\/([^/]+)/i.exec(args[1]);
		if (
			targetOrigin &&
			targetOrigin[0].toLowerCase() !== origin &&
			targetOrigin[1] !== cors_api_host
		) {
			args[1] = cors_api_url + args[1];
		}
		return open.apply(this, args);
	};
})();

const AUTH_TOKEN = "tokensupersegurors";
const CORS = "https://cors-anywhere.herokuapp.com/";

const client = new ApolloClient({
	uri: `${CORS}https://dropmail.me/api/graphql/${AUTH_TOKEN}`,
	fetchOptions: {
		mode: "cors",
	},
	headers: {
		ContentType: "application/json",
		"Access-Control-Allow-Origin": "*",
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

	const { data, errors } = useQuery(CHECK_EMAIL);

	return { data, errors };
}

export default client;
