import getClient from '../util/client'
import { currentCartQuery } from './query'
import normalizer from './normalizer'

export default async function fetchCurrentCart(req, res) {
  const client = getClient(req, res)
  const rawData = client.query({ query: currentCartQuery })
  const cart = normalizer(rawData)

  return cart
}
