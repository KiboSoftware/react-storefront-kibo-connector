import Result from 'react-storefront-connector/Result'
import ProductPageData from '../types/ProductPageData'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import getClient from '../util/client'
import query from './query'
import normalizeProduct from './normalizer'
import fetchVariant from './variants/configure'
import getAppData from '../app/getAppData'

import { createPDPBreadcrumbs } from '../util/createBreadcrumbs'

async function getPageData(rawData) {
  const product = normalizeProduct(rawData)
  return {
    title: product.name,
    product: product,
    breadcrumbs: createPDPBreadcrumbs(rawData),
  }
}

export default async function product(
  { id },
  req,
  res,
): Promise<Result<ProductPageData>> {
  const { color, size } = req.query

  const client = getClient(req, res)
  const raw = await client.query({ query: query(id) })

  let variantData
  if (color || size) {
    console.log('---------------------color -----------', color,'------size-------------',size,"-----raw-----", raw)

    variantData = await fetchVariant(id, { color, size }, req, res)
  }
  if (variantData?.data && raw?.data) {
    Object.assign(raw.data, variantData.data)
  }
  const result = await fulfillAPIRequest(req, {
    appData: () => getAppData(req, res),
    pageData: () => getPageData(raw),
  })
  return result
}

export { normalizeProduct }
