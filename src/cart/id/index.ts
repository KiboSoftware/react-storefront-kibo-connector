import getClient from '../../util/client'
import { cartByIdQuery } from '../query'
import normalizer from '../normalizer'

export default async function fetchCartById(authorization, cartId) {
  // const rawData = await fetchWithApollo( { query: cartByIdQuery(cartId) }, authorization)
  const rawData = await getClient({ query: cartByIdQuery(cartId) })

  const cart = normalizer(rawData)

  return cart
}
