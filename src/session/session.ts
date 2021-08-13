// /* eslint-disable max-len */

import getAuthFromRequest from '../helpers/sessionTokenHelpers'
import { COOKIES } from '../constants'
// import createCartForUserId from '../cart/common/create-cart'
import { getCurrentCart } from '../cart'
import { obtainSessionData } from './guest'

import {
  getUserIdFromTicket,
  encodeAuthTicket,
} from '../helpers/sessionTokenHelpers'

import {
  setCookies,
  prepareSetCookie,
  prepareKillCookie,
} from '../helpers/nodeCookieHelpers'
import getCurrentUser from './getCurrentUser'
import getClient from '../util/client'

export default async function session(req, res): Promise<any> {
  const cookiesToSet = []

  // // ### 1 - LOGGED IN SESSION?
  const currentUserResponse = await getCurrentUser(req, res)
  console.log('--------current User----------', currentUserResponse)
  if (currentUserResponse) {
    return {
      signedIn: true,
      currentUserResponse,
      cart: {
        items: [],
      },
    }
  }

  // # Obtain returning session
  // const existingSession = getAuthFromRequest(req)
  // if (existingSession) {
  //   const cart = await getCurrentCart(existingSession, req, res)
  //   return {
  //     signedIn: false,
  //     cart: {
  //       items: [],
  //     },
  //   }
  // }

  // // obtain new session
  // const newAuthTicket = await obtainSessionData(req, res)
  // if (newAuthTicket) {
  //   console.log('boooooo, got auth')
  //   const guestUserId = getUserIdFromTicket(newAuthTicket)
  //   const encodedTicket = encodeAuthTicket(newAuthTicket)
  //   //const cartId = await createCartForUserId(newAuthTicket, guestUserId)

  //   cookiesToSet.push(
  //     prepareSetCookie(COOKIES.KIBO_CUSTOMER_TOKEN, encodedTicket, {
  //       maxAge: 3600 * 24,
  //     }),
  //   )
  //   cookiesToSet.push(
  //     prepareSetCookie(COOKIES.KIBO_USER, guestUserId, { maxAge: 3600 * 24 }),
  //   )
  //   // cookiesToSet.push(
  //   //     prepareSetCookie(COOKIES.KIBO_CUSTOMER_CART_ID, cartId, { maxAge: 3600 * 24 })
  //   // )
  // }

  // setCookies(res, cookiesToSet)

  return {
    signedIn: false,
    cart: {
      items: [],
    },
  }
}
