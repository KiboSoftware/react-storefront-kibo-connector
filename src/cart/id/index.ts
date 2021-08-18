import getClient from '../../util/client'
import { cartByIdQuery } from '../query'
import normalizer from '../normalizer'

export default async function fetchCartById(cartId, req, res) {
  const client = getClient(req,res)
  const rawData = client.query({ query: cartByIdQuery(cartId) })

  const cart = normalizer(rawData)

  return cart
}
