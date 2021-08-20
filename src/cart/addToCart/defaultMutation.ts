import { cartItemDetails } from '../../fragments/cartItemDetails'
import gql from 'graphql-tag'

const addToCurrentCartMutation = gql`
  ${cartItemDetails}

  mutation addToCart($productToAdd: CartItemInput!) {
    addItemToCurrentCart(cartItemInput: $productToAdd) {
      ...cartItemDetails
    }
  }
`

export default addToCurrentCartMutation
