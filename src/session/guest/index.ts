import getClient from '../../util/client'
import gql from 'graphql-tag'

const query = gql`
  query GetCart {
    currentCart {
      id
    }
  }
`
export async function obtainSessionData(req, res) {
  // const rawResponse = await fetchWithApollo({query})
  const client = getClient(req, res)
  const rawResponse = (await client.query({ query })) as any

  return rawResponse.authorization
}
