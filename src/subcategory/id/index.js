import getClient from '../../util/client'
import query from './query'
import normalizeCategory from './normalizer' 

export default async function(categoryId) {
    
    // const category = await fetchWithGraphQL({ query: query(categoryId) })
    const category = await getClient({ query: query(categoryId) })


    return normalizeCategory(category)
}