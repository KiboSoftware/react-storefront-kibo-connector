import getClient from '../util/client'
import { currentCartQuery } from './query'
import normalizer from './normalizer'

export default async function fetchCurrentCart(authorization) {
  // const rawData = await fetchWithApollo( { query: currentCartQuery }, authorization)
  const rawData = await getClient({ query: currentCartQuery })
  const cart = normalizer(rawData)

  return cart
}
