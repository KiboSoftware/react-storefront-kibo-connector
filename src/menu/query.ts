import { gql } from 'graphql-tag';
import { categoryUrlInfo } from '../fragments/category'

function getChildrenCategoriesSchema(numberOfLevels=1) {
    let schemaStr = ""
    for (let index = numberOfLevels; index > 0 ; index--) {
      schemaStr = `childrenCategories {
          ...categoryUrlInfo
          ${schemaStr}
        }`
      }
    return schemaStr
} 

const query = (numberOfLevels=1) =>  gql`
{
  categoriesTree {
    items {
      ...categoryUrlInfo
      ${getChildrenCategoriesSchema(numberOfLevels)}
    }
  }
}
${categoryUrlInfo}
`
export default query