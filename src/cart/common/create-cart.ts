import gql from 'graphql-tag'
import get from 'lodash/get'

import getClient from '../../util/client'

const mutation = gql`
  mutation createCart($id: String!) {
    createCartForUser(userId: $id) {
      id
    }
  }
`

export default async function createCartForUserId(authTicket, userId, req, res) {
  const client = getClient(req,res)
  const cartId = await client.mutate({ mutation, variables: { id: userId } })

  let test = get(cartId, 'data.cart.id')

  return test
}
