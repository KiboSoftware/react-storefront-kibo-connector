
import {fetchWithApollo} from '../../util/fetchWithGraphQL'
import gql from 'graphql-tag'

const query = gql`
query GetCart {
    currentCart{
        id
    }
}
`
export async function obtainSessionData(req) {
    const rawResponse = await fetchWithApollo({query})
    return rawResponse.authorization
}