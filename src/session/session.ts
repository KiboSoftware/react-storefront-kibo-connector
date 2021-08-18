import Session from 'react-storefront-connector/Session'
import { getCurrentCart } from '../cart'
// /* eslint-disable max-len */

import getCurrentUser from './getCurrentUser'

export default async function session(req, res): Promise<Session> {
  const currentUserResponse = await getCurrentUser(req, res)
  const cart = await getCurrentCart(req, res)
  const {
    emailAddress,
    firstName,
    lastName,
    isAnonymous,
  } = currentUserResponse?.data?.customerAccount
  if (!isAnonymous) {
    return {
      signedIn: true,
      email: emailAddress,
      name: `${firstName} ${lastName}`,
      cart: cart
    }
  }

  return {
    signedIn: false,
    cart: cart
  }
}
