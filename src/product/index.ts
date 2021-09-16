import Result from 'react-storefront-connector/Result'
import ProductPageData from '../types/ProductPageData'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import getClient from '../util/client'
import query from './query'
import normalizeProduct from './normalizer'
import fetchVariant from './variants/configure'
import getAppData from '../app/getAppData'

import { createPDPBreadcrumbs } from '../util/createBreadcrumbs'
import getContent from '../getContent'

async function getPageData(rawData, banner) {
  const product = normalizeProduct(rawData)
  return {
    title: product.name,
    product: product,
    breadcrumbs: createPDPBreadcrumbs(rawData),
    slots: {
      banner: banner,
    },
  }
}

export default async function product(
  { id },
  req,
  res,
): Promise<Result<ProductPageData>> {
  const { color, size } = req.query
  const documentType = process.env?.PRODUCT_DOCUMENT_TYPE
  const client = getClient(req, res)
  const raw = await client.query({ query: query(id) })
  let variantData
  if (color || size) {
    variantData = await fetchVariant(id, { color, size }, req, res)
  }
  if (variantData?.data && raw?.data) {
    Object.assign(raw.data, variantData.data)
  }
  let banner = null
  try {
    const documentResponse = await getContent(
      {
        documentType,
        slug: raw?.data?.product?.content?.seoFriendlyUrl,
      },
      req,
      res,
    )

    banner = documentResponse?.data?.documentListDocuments?.items?.map(
      (item) => item?.properties?.content,
    )
  } catch {
    banner = []
  }

  const result = await fulfillAPIRequest(req, {
    appData: () => getAppData(req, res),
    pageData: () => getPageData(raw, banner),
  })
  return result
}

export { normalizeProduct }
