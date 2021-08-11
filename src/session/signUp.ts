import Session from 'react-storefront-connector/Session'
import SignUpData from 'react-storefront-connector/SignUpData'
import getClient from '../util/client'
import {
  createAccountLoginMutation,
  createAccountMutation,
} from './mutations/registerUserMutation'

function getCreateAccountVars(signUpData) {
  const { emailAddress, firstName, lastName } = signUpData
  return {
    createAccountInput: {
      emailAddress,
      firstName,
      lastName,
      acceptsMarketing: true,
      isAnonymous: false,
      isLocked: false,
      isActive: true,
      id: 0,
      hasExternalPassword: false,
      taxExempt: false,
    },
  }
}

function getCreateAccountLoginVars(id, password, account) {
  const { emailAddress } = account
  return {
    id,
    createAccountLoginInput: {
      emailAddress,
      username: emailAddress,
      password,
      isImport: false,
    },
  }
}

export default async function signUp(
  data: SignUpData,
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req)
  const account = {
    emailAddress: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }

  const customerAccountResponse = (await client.mutate({
    mutation: createAccountMutation,
    variables: getCreateAccountVars(account),
    fetchPolicy: 'no-cache',
  })) as any

  const id = customerAccountResponse.data?.account?.id

  const customerAccountLoginResponse = (await client.mutate({
    mutation: createAccountLoginMutation,
    variables: getCreateAccountLoginVars(id, data.password, account),
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        'x-vol-user-claims': null,
      },
    },
  })) as any

  return customerAccountLoginResponse
}
