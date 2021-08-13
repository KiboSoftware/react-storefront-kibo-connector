import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getAppData from './getAppData'

export default function withAppData(req, res, getPageData) {
  try {
    return fulfillAPIRequest(req, {
      appData: () => getAppData(req, res),
      pageData: getPageData,
    })
  } catch {
    return "I don't know why its happening"
  }
}
