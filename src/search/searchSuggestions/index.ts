import SearchSuggestions from 'react-storefront-connector/SearchSuggestions'
import fetchWithGraphQl from '../../util/fetchWithGraphQL'
import normalizeSuggestionGroups from './normalizer'
import query from './query'

/**
 * An implementation of the API for the SearchPopup component using Kibo SearchSuggestions API.
 * @param {Object} params
 * @param {String} params.q The search text
 * @return {Promise<SearchSuggestions>} An object whose shape matches SearchSuggestion
 */

export default async function searchSuggestions(q, req, res): Promise<SearchSuggestions> {

    const rawData = await fetchWithGraphQl({ query: query(q) })
    
    return {
        text: q,
        groups: normalizeSuggestionGroups(rawData)
    }

}