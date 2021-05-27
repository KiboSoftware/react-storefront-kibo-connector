import { categoryInfo } from '../../fragments/category'

const query = (categoryId) => `
{
    category(categoryId: ${categoryId}) {
            ...categoryInfo
    }
}
${categoryInfo}
`

export default query
