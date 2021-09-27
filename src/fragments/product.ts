import gql from 'graphql-tag'

export const productPrices = gql`
  fragment productPrices on Product {
    price {
      price
      salePrice
    }
    priceRange {
      lower {
        price
        salePrice
      }
      upper {
        price
        salePrice
      }
    }
  }
`
export const productAttributes = gql`
  fragment productAttributes on Product {
    properties {
      attributeFQN
      attributeDetail {
        name
      }
      isHidden
      values {
        value
        stringValue
      }
    }
  }
`
export const productContent = gql`
  fragment productContent on Product {
    content {
      productFullDescription
      productShortDescription
      seoFriendlyUrl
      productName
      productImages {
        imageUrl
        imageLabel
        mediaType
      }
    }
  }
`
export const productOptions = gql`
  fragment productOptions on Product {
    options {
      attributeFQN
      isProductImageGroupSelector
      isRequired
      isMultiValue
      values {
        value
        isSelected
        deltaPrice
        stringValue
      }
    }
  }
`
export const productInfo = gql`
  fragment productInfo on Product {
    productCode
    productUsage
    variations {
      productCode
      options {
        attributeFQN
        value
      }
    }
    categories {
      categoryCode
      categoryId
      content {
        name
        slug
      }
    }
    ...productPrices
    ...productAttributes
    ...productContent
    ...productOptions
  }
  ${productPrices}
  ${productAttributes}
  ${productContent}
  ${productOptions}
`
