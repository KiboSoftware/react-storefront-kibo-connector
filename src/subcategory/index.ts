import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import SubcategoryPageData from 'react-storefront-connector/SubcategoryPageData'
import Result from 'react-storefront-connector/Result'

import get from 'lodash/get'
import query from './query'
import normalizeSubcategory from './normalizer'
import getCategory from './id'

import fetchWithGraphQl from '../util/fetchWithGraphQL.js'
import getAppData from '../app/getAppData.js';
import { createCategoryBreadcrumbs } from '../util/createBreadcrumbs'

async function getPageData(rawData) {

    const category = normalizeSubcategory(rawData)

    let categoriesForCrumbs = []
    const parentCategoryId = get(rawData, 'data.categories.items[0].parentCategory.categoryId', 0)
    console.log(parentCategoryId)
    if(parentCategoryId) {
        const parentCategory = await getCategory(parentCategoryId)
        console.log(parentCategory)
        categoriesForCrumbs.push(parentCategory)
    }

    return {
        ...category,
        title: category.name,
        breadcrumbs: createCategoryBreadcrumbs(categoriesForCrumbs),
    }
}
/**
 * An implementation of the API for the Subcategory Page using Kibo Product Listing data.
 * @param {Object} params
 * @param {String} params.q The search text
 * @param {Array} params.slug List of url slugs 
 * @param {String} params.filters JSON Stringified list of search facets
 * @param {Number} params.page The current page number
 * @return {Promise<Object>} An object whose shape matches 
 */
export default async function subcategory(params, req, res): Promise<Result<SubcategoryPageData>>  {
    console.log(`Sub cat connector`)
    let { q, slug, page = 0, filters, sort, more = false } = params
    
    // parse facet filter values
    if(filters) {
        filters = JSON.parse(filters)
    } else {
        filters = []
    }

    let categoryCode
    if(slug) {
        categoryCode = slug.pop()
    }

    const productListingQuery = query({ categoryCode: categoryCode, filters, currentPage: page, sort, search: q })
    const rawData = await fetchWithGraphQl({ query: productListingQuery })
    const pd = await getPageData(rawData)
    

    return await fulfillAPIRequest(req, {
        appData: getAppData,
        pageData: () => Promise.resolve(pd),
      })
}