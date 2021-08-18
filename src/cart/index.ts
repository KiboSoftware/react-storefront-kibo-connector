import CartResponse from 'react-storefront-connector/CartResponse'
import Result from 'react-storefront-connector/Result'

import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getAppData from '../app/getAppData'

// fetch current cart based on session
import getCurrentCart from './fetcher'

export default async function cart(req, res): Promise<Result<CartResponse>> {
  const cart = await getCurrentCart(req, res)

  return await fulfillAPIRequest(req, {
    appData: () => getAppData(req, res),
    pageData: () =>
      Promise.resolve({
        title: 'Cart',
        breadcrumbs: [
          {
            text: `Home`,
            href: '/',
          },
        ],
        cart,
      }),
  })
}

export { getCurrentCart }
