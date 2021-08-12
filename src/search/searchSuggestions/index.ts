import SearchSuggestions from 'react-storefront-connector/SearchSuggestions'
import getClient from '../../util/client'
import normalizeSuggestionGroups from './normalizer'
import query from './query'

/**
 * An implementation of the API for the SearchPopup component using Kibo SearchSuggestions API.
 * @param {Object} params
 * @param {String} params.q The search text
 * @return {Promise<SearchSuggestions>} An object whose shape matches SearchSuggestion
 */

export default async function searchSuggestions(
  q,
  req,
  res,
): Promise<SearchSuggestions> {
  const client = getClient(req,res)
  const rawData = await client.query({ query: query(q) })

  return {
    text: q,
    groups: normalizeSuggestionGroups(rawData),
  }
}
