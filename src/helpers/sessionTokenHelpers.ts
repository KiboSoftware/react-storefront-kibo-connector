import { getCookieValue } from './nodeCookieHelpers'
import { COOKIES } from '../constants'

function decodeAuthString(base64String) {
  try {
    const text = Buffer.from(base64String, 'base64').toString('ascii')
    return JSON.parse(text)
  } catch (e) {
    console.log(e)
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

/**
 * @param Object http request
 * @return Kibo Authentication Object from client request cookie
 */
function getAuthTicketFromRequest(req) {
  const authCookieValue = getCookieValue(req, COOKIES.KIBO_CUSTOMER_TOKEN)
  if (!authCookieValue) {
    return
  }
  const authTicket = decodeAuthString(authCookieValue)
  console.log(`Auth userid`, getUserIdFromTicket(authTicket))
  return authTicket
  //    return decodeAuthString(authCookieValue)
}
export default getAuthTicketFromRequest

export {
  getUserIdFromTicket,
  getCartIdFromRequest,
  getUserIdFromRequest,
  encodeAuthTicket,
}
