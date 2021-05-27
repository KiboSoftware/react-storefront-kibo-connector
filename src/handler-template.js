import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import fetchWithGraphQl from '../util/fetchWithGraphQL.js'
import getAppData from '../util/getAppData.js';

export default async function api_name(params, req, res) {


    return await fulfillAPIRequest(req, {
        appData: () => {},//,createAppData,
        pageData: () =>
          Promise.resolve({
              //domain / page data object
            breadcrumbs: [
              {
                text: `Home`,
                href: '/',
              },
            ],
          }),
      })
}