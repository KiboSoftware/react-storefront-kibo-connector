import { productInfo } from '../fragments/product'

const query = (productCode) => `
{
  product(productCode: "${productCode}") {
    ...productInfo
  }
}
${productInfo}
`;

export default query