import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'
import session from './session'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'
import { getCurrentCart } from '../cart'

export default async function (req: Request, res: Response): Promise<Session> {
  const client = await getClient(req, res)
  try {
    const requestBody = req.body as any
    const parsedRequestBody = await JSON.parse(requestBody)
    const loginResponse: any = await client.loginCustomerAndSetAuthTicket({
      username: parsedRequestBody.email,
      password: parsedRequestBody.password,
    })
    const { customerAccount, userId } = loginResponse
    if (userId) {
      const cart = await getCurrentCart(req, res)
      return {
        cart,
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
