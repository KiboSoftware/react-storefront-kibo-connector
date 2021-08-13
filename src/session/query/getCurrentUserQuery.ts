import gql from 'graphql-tag'

const getCurrentUserQuery = gql`
  query getUser {
    customerAccount: getCurrentAccount {
      id
      firstName
      lastName
      emailAddress
      userName
      isAnonymous
    }
  }
`

export default getCurrentUserQuery
