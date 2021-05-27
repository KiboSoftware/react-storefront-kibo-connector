// GQL Mutation 
// @TODO - Do something with this (apollo client library?)
const mutation = `
mutation CongifureProd($productCode: String!, $selectedOptions: ProductOptionSelections_Input!, $quantity:Int){
    configureProduct(productCode:$productCode, quantity:$quantity, includeOptionDetails:true, productOptionSelections_Input: $selectedOptions){
      productCode
      variationProductCode
      price {
        salePrice
        price
      }
      productImages {
        imageUrl
        imageLabel
        productImageGroupId   
      }
    }
}
`;

export default mutation