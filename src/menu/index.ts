import MenuItem from 'react-storefront-connector/MenuItem'
import get from 'lodash/get'
import getClient from '../util/client'
import query from './query'
import normalizer from './normalizer'

export default async function (numberOfLevels, req): Promise<MenuItem[]> {
  const client = getClient(req)
  const rawData = await client.query({ query: query(numberOfLevels) })

  const tabs = normalizer(get(rawData, 'data.categoriesTree.items', []))
  return tabs
}
