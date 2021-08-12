import Result from 'react-storefront-connector/Result'
import withAppData from '../app/withAppData'

export default async function (req, res): Promise<Result<any>> {
  const data = await withAppData(req, res, () =>
    Promise.resolve({
      title: 'User Authentication',
      slots: {
        heading: 'Auth',
        description: 'Sign up and Sign In!',
      },
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    }),
  )

  return { ...data }
}
