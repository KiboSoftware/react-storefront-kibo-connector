import gql from "graphql-tag"

export const categoryUrlInfo = gql`
fragment categoryUrlInfo on PrCategory {
  categoryId
  categoryCode
  content {
    name
    slug
  }
}
`
export const categoryInfo = gql`
fragment categoryInfo on PrCategory {
    categoryId
    categoryCode
    content {
      	slug
        name
        description
        pageTitle
    }
    parentCategory {
        categoryId
        content {
            name
        }
    }
    childrenCategories {
        categoryId
        content {
            name
        }
    }
}`