import { colorAttrFQN, sizeAttrFQN } from './../../util/constants';
import getClient from '../../util/client'
import normalizeCart from '../normalizer'
import { currentCartQuery } from '../query'
import addToCurrentCartMutation from './defaultMutation'

function buildAddToCartVariables({
  product,
  quantity,
  color,
  size,
}: {
  product: any
  quantity: number
  color: string
  size: string
}) {
  let selected = []
  if (color) {
    selected.push({
      attributeFQN: colorAttrFQN,
      value: color,
    })
  }
  if (size) {
    selected.push({
      attributeFQN: sizeAttrFQN,
      value: size,
    })
  }

  let variationProductCode = product?.variations?.filter((each) => {
    return JSON.stringify(each.options) === JSON.stringify(selected)
  })[0]?.productCode

  return {
    productToAdd: {
      product: {
        isTaxable: true,
        isRecurring: false,
        productCode: product.id,
        isPackagedStandAlone: product.isPackagedStandAlone || true,
        variationProductCode: variationProductCode || null,
        options: selected,
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

  const variables = await buildAddToCartVariables({
    product,
    quantity,
    color,
    size,
  })
  await client.mutate({ mutation: addToCurrentCartMutation, variables })

  const rawCart = await client.query({ query: currentCartQuery })

  return { cart: normalizeCart(rawCart) }
}
