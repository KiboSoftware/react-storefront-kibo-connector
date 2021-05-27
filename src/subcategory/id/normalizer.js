import get from 'lodash/get'

export default function normalizeCategory(rawData) {
    
    const category = get(rawData, 'data.category', {});
    const { categoryId } = category
    const categoryName = get(rawData, 'data.category.content.name', "")
    const pageTitle = get(rawData, 'data.category.content.pageTitle', categoryName)

    return {
        id: categoryId,
        name: categoryName,
        title: pageTitle
    }
}