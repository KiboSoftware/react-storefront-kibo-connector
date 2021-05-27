import get from 'lodash/get'
import createSortOptions from '../util/createSortOptions'
import { normalizeProduct } from '../product'

function getChildCategoryNavLinks(rawData) {
    const childrenCategories = get(rawData, 'data.category.childrenCategories', [])
    const items = childrenCategories.map(cat => ({
            text: cat.content.name, 
            link: `/s/${cat.categoryId}`
        })
    )
    return { items }
}

function normalizeProductList(rawData) {
    const searchResultItems = get(rawData, 'data.productSearch.items', [])
    //fix mapper params
    return searchResultItems.map(item => {
        const product = normalizeProduct({ data: { product: item} })
        return {
            ...product,
            basePriceText: product.priceText
        }
    })
}

function getFacetsData(rawData) {
    const rawFacets = get(rawData, 'data.productSearch.facets', [])
        .filter((facet) => get(facet, 'field') !== 'CategoryId'); // skip categories


    return rawFacets.map((rawFilter) => {

        const attr = get(rawFilter, 'field');
        const isColorFacet = attr === 'tenant~color';
        const rawOptions = get(rawFilter, 'values', []);

        return {
          name: get(rawFilter, 'label'),
          ui: 'buttons',
          options: rawOptions
            .map((option) => ({
              name: get(option, 'label'),
              code: get(option, 'filterValue'),
              matches: get(option, 'count', 0),
              css: isColorFacet ? get(option, 'label', '').toLowerCase() : '',
            })),
        };
      })
}

function normalizeSearchResults(rawData) {

    const productSearchResult = get(rawData, 'data.productSearch', {})
    const { startIndex = 0, pageSize = 0 } = productSearchResult
    const totalPages = get(productSearchResult, 'pageCount', 1)
    const page = startIndex > 0 ? (startIndex / pageSize) : 0

    return {
        total: get(productSearchResult, 'totalCount', 0),
        page,
        totalPages,
        facets: getFacetsData(rawData),
        sort: "",
        sortOptions: createSortOptions(),
        products: normalizeProductList(rawData)
    }
}


export default function normalizeSubcategory(rawData): any {

    const rawCategory = get(rawData, 'data.categories.items[0]',{});
    const categoryCode = get(rawCategory, 'categoryCode')
    const categoryName = get(rawCategory, 'content.name', "")
    const pageTitle = get(rawCategory, 'content.pageTitle', categoryName)

    return {
        name: categoryName,
        title: pageTitle,
        id: categoryCode,
        ...normalizeSearchResults(rawData)
    }
}