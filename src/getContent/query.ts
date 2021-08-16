import gql from 'graphql-tag'

export default gql`
query($documentListName: String!, $filter: String) {
  documentListDocuments(documentListName: $documentListName, filter: $filter) {
      startIndex
      totalCount
      items {
        properties
        }
    }
}`;
