import getClient from '../../util/client'
import gql from 'graphql-tag'

const query = gql`
  query GetCart {
    currentCart {
      id
    }
  }
`
export async function obtainSessionData(req) {
  // const rawResponse = await fetchWithApollo({query})
  const rawResponse = (await getClient({ query })) as any

  return rawResponse.authorization
}
