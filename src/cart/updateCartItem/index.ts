import CartResponse from "react-storefront-connector/CartResponse";
import getClient from '../../util/client'
import { updateCurrentCartQuantityQuery } from './query'
import { currentCartQuery } from '../query'
import normalizeCart from '../normalizer'

function buildUpdateCartItemVariables(item, quantity){
    return {
        itemId: item.id,
        quantity
    }
}
export default async function updateCartItem(item, quantity, req, res): Promise<CartResponse> {
    const client = getClient(req,res)
    const variables = buildUpdateCartItemVariables(item, quantity)
    await client.mutate({ mutation: updateCurrentCartQuantityQuery, variables })

    const rawCart = await client.query({ query: currentCartQuery })

    return { cart: normalizeCart(rawCart) }
}