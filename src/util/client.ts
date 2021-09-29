import { COOKIES } from './../constants'
import config from '../config.js'
import { CreateApolloClient } from '@kibocommerce/graphql-client'
import getAuthTicketFromRequest, {
  encodeAuthTicket,
} from '../helpers/sessionTokenHelpers'
import {
  setCookies,
  prepareSetCookie,
  prepareKillCookie,
} from '../helpers/nodeCookieHelpers'

let authorization

function getClient(req, res) {
  if (!authorization) {
    authorization = getAuthTicketFromRequest(req)
  }
  const clientAuthHooks = {
    onTicketChange: (authTicket: any) => {
      if (
        !authorization ||
        authorization.accessToken !== authTicket.accessToken
      ) {
        authorization = authTicket
        const authCookie = prepareSetCookie(
          COOKIES.KIBO_CUSTOMER_TOKEN,
          encodeAuthTicket(JSON.stringify(authorization)),
          authorization?.accessTokenExpiration
            ? { expires: new Date(authorization.accessTokenExpiration) }
            : {},
        )
        setCookies(res, [authCookie])
      }
    },
    onTicketRead: () => {
      return authorization as any
    },
    onTicketRemove: () => {
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
