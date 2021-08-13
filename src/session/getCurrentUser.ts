import Session from 'react-storefront-connector/Session'
import getClient from '../util/client'
import getCurrentUserQuery from './query/getCurrentUserQuery'

export default async function (req: Request, res: Response): Promise<any> {
  const client = await getClient(req, res)
  return await client.query({ query: getCurrentUserQuery })
}
