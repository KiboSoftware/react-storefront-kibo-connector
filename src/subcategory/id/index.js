import getClient from '../../util/client'
import query from './query'
import normalizeCategory from './normalizer' 

export default async function(categoryId) {
    
    const client = getClient(req)
    const category = await client.query({ query: query(categoryId) })


    return normalizeCategory(category)
}