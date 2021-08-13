import Session from 'react-storefront-connector/Session'
// /* eslint-disable max-len */

import getCurrentUser from './getCurrentUser'

export default async function session(req, res): Promise<Session> {
  const cookiesToSet = []

  const currentUserResponse = await getCurrentUser(req, res)
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
      cart: {
        items: [],
      },
    }
  }

  return {
    signedIn: false,
    cart: {
      items: [],
    },
  }
}
