import gql from 'graphql-tag'
import get from 'lodash/get'

import { mutateWithApollo } from '../../util/fetchWithGraphQL'

const mutation = gql`
mutation createCart($id:String!) {
    createCartForUser(userId:$id){
      id
    }
}`

export default async function createCartForUserId(authTicket, userId) {

    const cartId = await mutateWithApollo({mutation, variables: { id: userId }}, authTicket)
    let test = get(cartId, 'data.cart.id')
    console.log('test\n\n========', test)
    console.log(JSON.stringify(cartId))
    return test
}