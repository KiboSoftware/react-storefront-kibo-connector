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
): Promise<Result<ProductPageData>> {
  const { color, size } = req.query

  const client = getClient(req)
  const raw = await client.query({ query: query(id) })

  let variantData
  if (color || size) {
    variantData = await fetchVariant(id, { color, size }, req)
  }
  if (variantData?.data && raw?.data) {
    Object.assign(raw.data, variantData.data)
  }
  const result = await fulfillAPIRequest(req, {
    appData: getAppData,
    pageData: () => getPageData(raw),
  })
  return result
}

export { normalizeProduct }
