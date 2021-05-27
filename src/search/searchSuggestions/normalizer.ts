import get from 'lodash/get'
import { createCategoryLink } from '../../util/createRouteLinks'

function normalizeSuggestedProducts(productGroup) {

    const products = get(productGroup, 'suggestions') || []
    return {
        caption: 'Suggested Products',
        ui: 'thumbnails',
        links: products.map(product => {

            const name = get(product, 'suggestion.productName')
            const code = get(product, 'suggestion.productCode')
            const imageUrls = get(product, 'suggestion.productImageUrls', [])
            return {
                text: name,
                href: '/p/[productId]',
                as: `/p/${code}`,
                thumbnail: { src: `https://${imageUrls[0]}?max=100`, alt: name }
            }
        })
    }
}
function normalizeSuggestedCategories(categoryGroup) {

    const categories = get(categoryGroup, 'suggestions') || []

    return {
        caption: 'Suggested Categories',
        ui: 'list',
        links: categories.map(categorySuggestion => {
            
            const name = get(categorySuggestion, 'suggestion.content.name')
            const categoryCode = get(categorySuggestion, 'suggestion.categoryCode')
            const slug = get(categorySuggestion, 'suggestion.content.slug')

            return createCategoryLink(name, [slug, categoryCode])
        })
    }

}
function normalizeSearchSuggestionGroups(rawData) {
    const suggestionGroups = get(rawData, `data.suggestionSearch.suggestionGroups`, [])

    return suggestionGroups
        .filter(group => group.suggestions && (group.name === 'Categories' || group.name === 'Pages'))
        .map(group => {
            if(group.name === 'Categories') {
                return normalizeSuggestedCategories(group)
            }
            return normalizeSuggestedProducts(group)
        })
}
export default normalizeSearchSuggestionGroups