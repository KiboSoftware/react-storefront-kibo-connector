

import { fetchWithApollo } from '../../util/fetchWithGraphQL'
import { cartByIdQuery } from '../query'
import normalizer from '../normalizer'

export default async function fetchCartById(authorization, cartId) {
    
    const rawData = await fetchWithApollo( { query: cartByIdQuery(cartId) }, authorization)
    
    const cart = normalizer(rawData)
    
    return cart
}
