import MenuItem from 'react-storefront-connector/MenuItem'
import get from 'lodash/get'
import fetchWithGraphQl from '../util/fetchWithGraphQL'
import query from './query'
import normalizer from './normalizer'

export default async function(numberOfLevels): Promise<MenuItem[]> {
    const rawData = await fetchWithGraphQl({ query: query(numberOfLevels) })
    const tabs = normalizer(get(rawData, 'data.categoriesTree.items', []))
    return tabs
}