import { productInfo } from '../fragments/product'
import gql from 'graphql-tag'

const query = (productCode) => `
{
  product(productCode: "${productCode}") {
    ...productInfo
  }
}
${productInfo}
`;

export default query