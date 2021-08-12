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
    console.log('---cred-------', val)
    const loginResponse: any = await client.loginCustomerAndSetAuthTicket({
      username: val.email,
      password: val.password,
    })
    const { customerAccount } = loginResponse
    if (loginResponse.userId) {
      return {
        cart: {
          items: [],
        },
        signedIn: true,
        email: customerAccount.emailAddress,
        name: customerAccount.firstName + ' ' + customerAccount.lastName,
      }
    } else {
      console.log('loginResponse', loginResponse)
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
