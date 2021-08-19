import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'

export default async function (
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req,res)
  
  if (client.ticketManager) {
    await client.ticketManager.invalidateTicket()
  }

  return {
    cart: {
      items: []
    },
    signedIn: false,
  }
}
