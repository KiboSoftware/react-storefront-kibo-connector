import { gql } from 'graphql-tag';

const registerUserMutation = gql`
  mutation registerUser($createAccountInput: CustomerAccountInput!) {
    account: createCustomerAccount(customerAccountInput: $createAccountInput) {
      emailAddress
      userName
      firstName
      lastName
      localeCode
      userId
      id
      isAnonymous
      attributes {
        values
        fullyQualifiedName
      }
    }
  }
`

export { registerUserMutation }
