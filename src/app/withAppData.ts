import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getAppData from './getAppData'

export default function withAppData(req, res, getPageData) {
  return fulfillAPIRequest(req, {
    appData: () => getAppData(req, res),
    pageData: getPageData,
  })
}
