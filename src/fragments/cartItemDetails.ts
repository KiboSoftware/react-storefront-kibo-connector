import gql from 'graphql-tag';

export const cartItemDetails = gql`
fragment cartItemDetails on CartItem {
  id
  product {
    productCode
    name
    description
    imageUrl
    options {
      attributeFQN
      name
      value
    }
    properties {
      attributeFQN
      name
      values {
        value
      }
    }
    sku
    price {
      price
      salePrice
    }
    categories {
      id
    }
  }
  quantity
}
`;
