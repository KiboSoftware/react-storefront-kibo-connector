import config from '../config.js';
import { CreateApolloClient } from '@kibocommerce/graphql-client'
import getAuthTicketFromRequest from '../helpers/sessionTokenHelpers'

function getClient(req) {

    let authorization = getAuthTicketFromRequest(req)

    const clientAuthHooks = {
      onTicketChange: (authTicket: any) => {
        if(authorization) {
          console.log(`has authorization`)
        }
        if(authTicket) {
          console.log(`has authTicket`)
        }
        if(authorization && authTicket && authorization.accessToken !== authTicket.accessToken){
          console.log(`Access tokens diff`)
        }
        if (!authorization || authorization.accessToken !== authTicket.accessToken) {
          authorization = authTicket;
          console.log(`on ticket change`)
        }
      },
      onTicketRead: () => {
        console.log(`read ticket`)
        return authorization as any;
      },
      onTicketRemove: () => {
        console.log(`on ticket remove`)
        authorization = undefined;
      }
    }

    const apolloClient = CreateApolloClient({
      api: config,
      clientAuthHooks
    });

    return apolloClient
}

export default getClient