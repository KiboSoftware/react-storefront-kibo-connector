import getClient from '../../util/client'
import query from './query'
import normalizeCategory from './normalizer' 

export default async function(categoryId, req, res) {
    console.log("----------------categoryId----------", categoryId)
    const client = getClient(req,res)
    const category = await client.query({ query: query(categoryId) })

    return normalizeCategory(category)
}