
export const productPrices = `
fragment productPrices on Product {
      price {
        price
        salePrice
      }
      priceRange {
        lower { price, salePrice}
        upper { price, salePrice }
      }
    }
`
export const productAttributes = `
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
export const productContent = `
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
export const productOptions = `
fragment productOptions on Product{
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
export const productInfo = `
fragment productInfo on Product {
        productCode
        productUsage
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
