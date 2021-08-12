import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getAppData from './app/getAppData'

export default async function account(req, res) {
  return await fulfillAPIRequest(req, {
    appData: () => () => getAppData(req, res),
    pageData: () =>
      Promise.resolve({
        title: 'My Account',
        account: {},
        breadcrumbs: [
          {
            text: 'Home',
            href: '/',
          },
        ],
      }),
  })
}
