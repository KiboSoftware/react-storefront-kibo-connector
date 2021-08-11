import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'

export default async function (
  username: string,
  password: string,
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req)
  try {
    const loginResponse: any = await client.loginCustomerAndSetAuthTicket({
      username,
      password,
    })
    const { customerAccount } = loginResponse
    if (loginResponse.userId) {
      return {
        cart: undefined,
        signedIn: true,
        email: customerAccount.emailAddress,
        name: customerAccount.firstName + ' ' + customerAccount.lastName,
      }
    } else {
      return {
        cart: undefined,
        signedIn: false,
      }
    }
  } catch {
    return {
      cart: undefined,
      signedIn: false,
    }
  }
}
