import gql from 'graphql-tag';

const createAccountMutation = gql`
mutation registerUser($createAccountInput: CustomerAccountInput!) {
    account:createCustomerAccount(customerAccountInput:$createAccountInput) {
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
}`;

const createAccountLoginMutation = gql`
mutation registerUserLogin($id: Int!, $createAccountLoginInput: CustomerLoginInfoInput!) {
    account:createCustomerAccountLogin(accountId:$id, customerLoginInfoInput:$createAccountLoginInput) {
        accessToken
        accessTokenExpiration
        refreshToken
        refreshTokenExpiration
        userId
        customerAccount {
            id
            emailAddress
            firstName
            userName
        }
    }
}`;

export {
  createAccountMutation,
  createAccountLoginMutation
};

