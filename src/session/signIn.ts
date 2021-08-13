import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'
import session from './session'

export default async function (
  { email, password },
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req, res)
  try {
    const x = req.body as any
    const val = await JSON.parse(x)
    const loginResponse: any = await client.loginCustomerAndSetAuthTicket({
      username: val.email,
      password: val.password,
    })
    const { customerAccount, userId } = loginResponse
    if (userId) {
      return {
        cart: {
          items: [],
        },
        signedIn: true,
        email: customerAccount.emailAddress,
        name: `${customerAccount.firstName} ${customerAccount.lastName}`,
      }
    } else {
      return {
        cart: {
          items: [],
        },
        signedIn: false,
      }
    }
  } catch {
    return {
      cart: {
        items: [],
      },
      signedIn: false,
    }
  }
}
