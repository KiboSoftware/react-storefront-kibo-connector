import fetchWithGraphQL from '../../util/fetchWithGraphQL'
import query from './query'
import normalizeCategory from './normalizer' 

export default async function(categoryId) {
    
    const category = await fetchWithGraphQL({ query: query(categoryId) })

    return normalizeCategory(category)
}