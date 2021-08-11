import getClient from '../../util/client'
import { cartByIdQuery } from '../query'
import normalizer from '../normalizer'

export default async function fetchCartById(authorization, cartId, req) {
  const client = getClient(req)
  const rawData = client.query({ query: cartByIdQuery(cartId) })

  const cart = normalizer(rawData)

  return cart
}
