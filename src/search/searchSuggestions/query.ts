import { gql } from 'graphql-tag';
const query = (query) => gql`
{
    suggestionSearch(query:"${query}", groups:"pages,categories"){
      suggestionGroups{
        name
        suggestions {
          suggestion
        }
      }
    }
}`

export default query 
