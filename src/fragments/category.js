export const categoryUrlInfo = `
fragment categoryUrlInfo on Category {
  categoryId
  categoryCode
  content {
    name
    slug
  }
}
`
export const categoryInfo = `
fragment categoryInfo on Category {
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