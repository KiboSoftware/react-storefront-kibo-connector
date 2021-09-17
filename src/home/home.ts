import Result from 'react-storefront-connector/Result'
import withAppData from '../app/withAppData'
import getContent from '../getContent'

export default async function home(req, res): Promise<Result<any>> {
  const data = await withAppData(req, res, async () => {
    const documentType = process.env?.HOME_DOCUMENT_TYPE
    const slug = 'home'
    const content = await getContent({ documentType, slug }, req, res)
    return Promise.resolve({
      title: 'Home',
      slots: {
        heading: 'Home',
        description: 'Welcome!',
        content: content.data.documentListDocuments.items.map(
          (item) => item.properties.content,
        ),
      },
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    })
  })

  return { ...data }
}
