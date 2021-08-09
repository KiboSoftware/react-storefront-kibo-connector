import MenuItem from 'react-storefront-connector/MenuItem'
import get from 'lodash/get'
import getClient from '../util/client'
import query from './query'
import normalizer from './normalizer'

export default async function (numberOfLevels): Promise<MenuItem[]> {
  // const rawData = await fetchWithGraphQl({ query: query(numberOfLevels) })
  const rawData = await getClient({ query: query(numberOfLevels) })

  const tabs = normalizer(get(rawData, 'data.categoriesTree.items', []))
  return tabs
}
