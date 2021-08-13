import { COOKIES } from './../constants'
import config from '../config.js'
import { CreateApolloClient } from '@kibocommerce/graphql-client'
import getAuthTicketFromRequest from '../helpers/sessionTokenHelpers'
import {
  setCookies,
  prepareSetCookie,
  prepareKillCookie,
} from '../helpers/nodeCookieHelpers'

function getClient(req, res) {
  let authorization = getAuthTicketFromRequest(req)

  const clientAuthHooks = {
    onTicketChange: (authTicket: any) => {
      if (
        !authorization ||
        authorization.accessToken !== authTicket.accessToken
      ) {
        authorization = authTicket
        const authCookie = prepareSetCookie(
          COOKIES.KIBO_CUSTOMER_TOKEN,
          JSON.stringify(authorization),
          authorization?.accessTokenExpiration
            ? { expires: new Date(authorization.accessTokenExpiration) }
            : {},
        )
        setCookies(res, [authCookie])
      }
    },
    onTicketRead: () => {
      console.log(`read ticket`)
      return authorization as any
    },
    onTicketRemove: () => {
      console.log(`on ticket remove`)
      prepareKillCookie(COOKIES.KIBO_CUSTOMER_TOKEN)
      authorization = undefined
    },
  }

  const apolloClient = CreateApolloClient({
    api: config,
    clientAuthHooks,
  })

  return apolloClient
}

export default getClient
