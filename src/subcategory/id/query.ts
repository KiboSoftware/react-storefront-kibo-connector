import gql from 'graphql-tag'
import { categoryInfo } from '../../fragments/category'

const query = (categoryId) => gql`
{
    category(categoryId: ${categoryId}) {
            ...categoryInfo
    }
}
${categoryInfo}
`

export default query
