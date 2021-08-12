import getClient from '../../util/client'
import normalizeCart from '../normalizer'
import { deleteCurrentCartItemQuery } from './query'
import { currentCartQuery } from '../query'

export default async function removeCartItem(item, req, res) {

    const client = getClient(req,res)
    
    await client.mutate({ mutation: deleteCurrentCartItemQuery, variables: { id: item.id } })
    
    const rawCart = await client.query({ query: currentCartQuery })

    return { cart: normalizeCart(rawCart) }
}