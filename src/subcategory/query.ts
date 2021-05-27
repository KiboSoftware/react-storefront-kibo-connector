import { categoryInfo } from '../fragments/category'
import { searchResults } from '../fragments/product-listing'

function getSubcategoryQuery(categoryCode) {
    if(!categoryCode){
        return
    }
    return `categories(filter: "categoryCode eq ${categoryCode}"){
        items {
            ...categoryInfo
        }
    },`
}
function getFacetValueFilter(categoryCode, filters=[]) {

    let facetValueFilter =''
    if(categoryCode) {
        facetValueFilter = `categoryCode:${categoryCode},`
    }
    // @TODO: Is the __v__ flag supposed to be in this list?
    facetValueFilter = facetValueFilter + filters.filter(facet => !facet.includes('__v__:')).join(',')

    return facetValueFilter
}

const query = ({
    categoryCode = null,
    pageSize = 5,
    currentPage = 1,
    filters = [],
    sort = '',
    search = '',
}) => {
    const startIndex = currentPage === 0 ? currentPage : (currentPage) * pageSize

    let facetTemplate='', filter = '' 
    if(categoryCode) {
        facetTemplate = `categoryCode:${categoryCode}`
        filter = `categoryCode req ${categoryCode}`
    }

    const facetValueFilter = getFacetValueFilter(categoryCode, filters)
    const categoryQuery = getSubcategoryQuery(categoryCode) || ''

    return `
    {
        ${categoryQuery}
        productSearch (
            query:"${search}",
            startIndex: ${startIndex},
            pageSize:${pageSize},
            sortBy:"${sort}",
            filter:"${filter}",
            facetTemplate:"${facetTemplate}", 
            facetValueFilter:"${facetValueFilter}",

        ) {
            ...searchResults
        }
    }
    ${categoryQuery ? categoryInfo : ''}
    ${searchResults}
    `
}
export default query