import gql from 'graphql-tag'

const updateCartQuantityQuery = gql`
mutation updateCartItemQuantity($cartId:String!, $itemId:String!, $quantity: Int!){
    updateCartItemQuantity(cartId:$cartId, cartItemId:$itemId, quantity:$quantity){
      id
      quantity
    }
}
`

const updateCurrentCartQuantityQuery = gql`
mutation updateCartItemQuantity($itemId:String!, $quantity: Int!){
    updateCurrentCartItemQuantity(cartItemId:$itemId, quantity:$quantity){
      id
      quantity
    }
}
`
export default updateCartQuantityQuery

export {
    updateCartQuantityQuery,
    updateCurrentCartQuantityQuery
}