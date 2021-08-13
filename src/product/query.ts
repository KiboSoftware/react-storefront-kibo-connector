import { productInfo } from '../fragments/product'
import gql from 'graphql-tag'

const query = (productCode) =>  gql`
{
  product(productCode: "${productCode}") {
    ...productInfo
  }
}
${productInfo}
`;

export default query