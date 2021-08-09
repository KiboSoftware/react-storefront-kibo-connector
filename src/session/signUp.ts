import Session from 'react-storefront-connector/Session'
import SignUpData from 'react-storefront-connector/SignUpData'
import getClient from '../util/client'
import { registerUserMutation } from './mutations/registerUserMutation';
// import createCustomer from './customer/createCustomer';
import signIn from './signIn';

export default async function signUp(
  data: SignUpData,
  req: Request,
  res: Response,
): Promise<Session> {
  const client = await getClient(req);

  const variables = buildSignUpDataVariables(data);

  await client.mutate({ mutation: registerUserMutation, variables });

  // if (signUpData.error) {
  //   throw new Error(signUpData.error)
  // }

  return signIn(data.email, data.password, req, res);
}


function buildSignUpDataVariables(signUpData) {
  const { emailAddress, firstName, lastName} = signUpData;
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
      taxExempt: false
    }
  }
}