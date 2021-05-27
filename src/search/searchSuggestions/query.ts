const query = (query) => `
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
