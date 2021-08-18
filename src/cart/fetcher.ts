import getClient from '../util/client'
import { currentCartQuery } from './query'
import normalizeCart from './normalizer'

export default async function fetchCurrentCart(req, res) {
  const client = getClient(req, res)
  const rawCart = await client.query({ query: currentCartQuery })
  const cart = normalizeCart(rawCart)

  return cart
}
