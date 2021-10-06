import { COOKIES } from "./../constants";
import config from "../config.js";
import { CreateApolloClient } from "@kibocommerce/graphql-client";
import getAuthTicketFromRequest, {
  setAuthTicketOnResponse,
} from "../helpers/sessionTokenHelpers";
import { prepareKillCookie } from "../helpers/nodeCookieHelpers";

function getClient(req, res) {
  let authorization = getAuthTicketFromRequest(req);
  const clientAuthHooks = {
    onTicketChange: (authTicket: any) => {
      if (authorization?.accessToken !== authTicket.accessToken) {
        authorization = authTicket;
        setAuthTicketOnResponse(req, res, authorization);
      }
    },
    onTicketRead: () => {
      return authorization as any;
    },
    onTicketRemove: () => {
      prepareKillCookie(COOKIES.KIBO_CUSTOMER_TOKEN);
      authorization = undefined;
    },
  };

  const apolloClient = CreateApolloClient({
    api: config,
    clientAuthHooks,
  });

  return apolloClient;
}

export default getClient;
