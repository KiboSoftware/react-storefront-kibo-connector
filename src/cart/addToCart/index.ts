
import get from 'lodash/get'
import getClient from '../../util/client'
import normalizeCart from '../normalizer'
import { addToCurrentCartQuery } from './query'
import { currentCartQuery } from '../query'

function buildAddToCartVariables({ product, quantity=1 }) {
    
  return {
      //cartId, // remove this if can get current user session working
      productToAdd: { 
        product:
            {
                isTaxable: true,
                isRecurring: false,
                productCode:get(product, 'id'),
                createDate: 0,
                updateDate: 0
            },
            quantity:quantity,
            fulfillmentMethod:"Ship"
        }
    }
}
export default async function addToCart({ product, quantity, color, size }, req, res) {

    const client = getClient(req)
    
    const variables = buildAddToCartVariables({product, quantity })

    await client.mutate({ mutation: addToCurrentCartQuery, variables })
    
    const rawCart = await client.query({query: currentCartQuery})

    console.log(`after add`, rawCart)
    return { cart: normalizeCart(rawCart) }
}