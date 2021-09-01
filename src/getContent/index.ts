
import get from 'lodash/get'
import getClient from '../util/client'
import defaultQuery from './query';

export default async function getContent(params, req, res) {
    const variables = { documentListName: params.documentType, filter: `properties.tags eq ${params.slug}` }

    const client = getClient(req, res)

    const response = await client.query({
        query: defaultQuery, variables: variables, context: {
            headers: {
                'x-vol-user-claims': null
            }
        }
    })

    return response;
}