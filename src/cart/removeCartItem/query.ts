import gql from 'graphql-tag'

/*
* Delete cart based on current user session
*/
const deleteCurrentCartItemQuery = gql`
mutation deleteCartItem($id: String!) {
    deleteCurrentCartItem(cartItemId:$id)
}`

/*
* Delete cartitem by cartid
*/
const deleteCartItemQuery = gql`
mutation deleteCartItem($cartId: String!, $id: String!) {
    deleteCartItem(cartId: $cartId, cartItemId:$id)
}`

export default deleteCurrentCartItemQuery

export {
    deleteCartItemQuery,
    deleteCurrentCartItemQuery
}