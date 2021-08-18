import get from 'lodash/get'
import getClient from '../../util/client'
import normalizeCart from '../normalizer'
import { currentCartQuery } from '../query'
import addToCurrentCartMutation from './defaultMutation'

function buildAddToCartVariables({
  product,
  quantity,
}: {
  product: any
  quantity: number
}) {
  return {
    productToAdd: {
      product: {
        isTaxable: true,
        isRecurring: false,
        productCode: product.id,
        isPackagedStandAlone: product.isPackagedStandAlone || true,
        variationProductCode: product.variationProductCode || null,
        options: product.options?.map((po) => ({
          attributeFQN: po.attributeFQN,
          name: po.attributeDetail.name,
          value: po.values.find((v) => v.isSelected).value,
        })) || [],
      },
      quantity,
      fulfillmentMethod: 'Ship',
      isAssemblyRequired: true,
    },
  }
}

export default async function addToCart(
  { product, quantity, color, size },
  req,
  res,
) {

  const client = getClient(req, res)

  const variables = buildAddToCartVariables({ product, quantity })

  await client.mutate({ mutation: addToCurrentCartMutation, variables })

  const rawCart = await client.query({ query: currentCartQuery })

  return { cart: normalizeCart(rawCart) }
}
