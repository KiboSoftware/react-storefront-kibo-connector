import { getCookieValue, prepareSetCookie, setCookies } from './nodeCookieHelpers'
import { COOKIES } from '../constants'

function decodeAuthString(base64String) {
  try {
    const text = Buffer.from(base64String, 'base64').toString('ascii')
    return JSON.parse(text)
  } catch (e) {
    console.warn(`Caught exception decoding / parsing auth string cookie`, e);
    return {}
  }
}

function encodeAuthTicket(authorizationTicket) {
  const authString = JSON.stringify(authorizationTicket)
  const encodedTicket = Buffer.from(authString, 'ascii').toString('base64')
  return encodedTicket
}

function getUserIdFromTicket(authorizationTicket) {
  const parsedUserId =
    authorizationTicket?.parsedJWT?.['https://www.kibocommerce.com/user_claims']
      ?.uid
  return parsedUserId
}

function getCartIdFromRequest(req) {
  const cartId = getCookieValue(req, COOKIES.KIBO_CUSTOMER_CART_ID)
  return cartId
}

function getUserIdFromRequest(req) {
  const authTicket = getAuthTicketFromRequest(req)
  if (!authTicket) {
    return
  }
  return getUserIdFromRequest(authTicket)
}

function setAuthTicketOnResponse(req, res, authorization) {
  
  req.KIBO_USER_AUTH_TICKET = authorization;

  const authCookie = prepareSetCookie(
    COOKIES.KIBO_CUSTOMER_TOKEN,
    encodeAuthTicket(authorization),
    authorization?.accessTokenExpiration
      ? { expires: new Date(authorization.accessTokenExpiration) }
      : {},
  )
  setCookies(res, [authCookie]);
}


/**
 * @param Object http request
 * @return Kibo Authentication Object from client request cookie
 */
function getAuthTicketFromRequest(req) {
  if(req.KIBO_USER_AUTH_TICKET) {
    return req.KIBO_USER_AUTH_TICKET;
  }
  const authCookieValue = getCookieValue(req, COOKIES.KIBO_CUSTOMER_TOKEN)
  if (!authCookieValue) {
    return
  }
  const authTicket = decodeAuthString(authCookieValue)
  return authTicket
}
export default getAuthTicketFromRequest

export {
  getUserIdFromTicket,
  getCartIdFromRequest,
  getUserIdFromRequest,
  encodeAuthTicket,
  setAuthTicketOnResponse
}
