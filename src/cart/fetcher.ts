import { fetchWithApollo } from '../util/fetchWithGraphQL'
import { currentCartQuery } from './query'
import normalizer from './normalizer'

export default async function fetchCurrentCart(authorization) {
    
    const rawData = await fetchWithApollo( { query: currentCartQuery }, authorization)
    const cart = normalizer(rawData)
    
    return cart
}
