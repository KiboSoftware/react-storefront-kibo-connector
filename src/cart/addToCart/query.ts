import gql from 'graphql-tag'

const addToCurrentCartQuery = gql`
mutation addToCart($productToAdd:CartItem_Input!){
    addItemToCurrentCart(cartItem_Input: $productToAdd) {
      id
    }
}`

const addToCartQuery = gql`
mutation addToCart($cartId: String!, $productToAdd:CartItem_Input!){
    addItemToCart(cartId: $cartId, cartItem_Input: $productToAdd) {
      id
    }
}
`
export default addToCartQuery

export {
    addToCurrentCartQuery,
    addToCartQuery
}