import Result from 'react-storefront-connector/Result'
import withAppData from '../app/withAppData'

export default async function home(req, res): Promise<Result<any>> {
  console.log('---------------inside Home-----------------------')
  const data = await withAppData(req, res, () =>
    Promise.resolve({
      title: 'Home',
      slots: {
        heading: 'Home',
        description: 'Welcome!',
      },
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    }),
  )
  console.log('---------------inside Home return-----------------------', data)

  return { ...data }
}
