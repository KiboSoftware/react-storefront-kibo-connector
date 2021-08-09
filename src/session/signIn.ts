// import get from 'lodash/get'
import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'

export default async function signIn(
  username: string,
  password: string,
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req)
  try {
    const loginResponse = client.loginCustomerAndSetAuthTicket({
      username,
      password,
    })
    return {
      cart: undefined,
      signedIn: true,
    }
  } catch {
    return {
      cart: undefined,
      signedIn: false,
    }
  }

}
