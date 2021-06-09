//
// Handler pattern
//
//
// import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
// import fetchWithGraphQl from '../util/fetchWithGraphQL.js'
// import getAppData from '../util/getAppData.js';
// import query from './query'
// import normalizer from './normalizer'
// export default async function api_name(params, req, res) {

//     const rawData = await fetchWithGraphQL({query: query(params.abc)})
//     const normalizedData = normalizer(rawData)

//     return await fulfillAPIRequest(req, {
//         appData: () => {},//,createAppData,
//         pageData: () =>
//           Promise.resolve({
//               //domain / page data object
//             breadcrumbs: [
//               {
//                 text: `Home`,
//                 href: '/',
//               },
//             ],
//             data: normalizedData
//           }),
//       })
// }