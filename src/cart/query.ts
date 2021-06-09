import gql from 'graphql-tag'

// add these back to product query
//           name
//           imageUrl
//

/*
* Get Cart based on current user session
*/
const currentCartQuery = gql`
query GetCurrentCart {
    cart: currentCart {
      id
      total
      userId
      items {
        id
        total
        product {
          productCode
          name
          imageUrl
        }
      }
    }
  }

`
/*
* Get Cart by cart id
*/
const cartByIdQuery = (cartId) => gql`
query GetCurrentCart {
    cart(cartId:"${cartId}") {
        id
        total
        userId
        items {
            id
            total
            product {
                productCode
                name
                imageUrl
            }
        }
    }
}
`

export default cartByIdQuery

export {
    cartByIdQuery,
    currentCartQuery
}