import gql from 'graphql-tag'
import { productInfo } from './product'

export const searchFacets = gql`
fragment searchFacets on Facet {
    label
    field
    values {
        label
        value
        isApplied
        filterValue
        isDisplayed
        count
    }
}`

export const searchResults = gql`
fragment searchResults on ProductSearchResult {
    totalCount
    pageSize
    pageCount
    startIndex
    items {
        ...productInfo
    }
    facets {
        ...searchFacets
    }
}
${searchFacets}
${productInfo}
`