import get from 'lodash/get'

export default function normalizeCategory(rawData) {
    
    const categoryId = get(rawData, 'data.category.categoryId', 0);
    const categoryName = get(rawData, 'data.category.content.name', "")
    const pageTitle = get(rawData, 'data.category.content.pageTitle', categoryName)

    return {
        id: categoryId,
        name: categoryName,
        title: pageTitle
    }
}