import get from 'lodash/get'
import MenuItem from 'react-storefront-connector/MenuItem';
import {createCategoryLink} from '../util/createRouteLinks'

function normalizeCategoryMenuItem(item) {
    const name = get(item, 'content.name')
    const slug = get(item, 'content.slug')
    const categoryCode = get(item, 'categoryCode')

    return createCategoryLink(name, [ slug, categoryCode ])
}
function normalizeMenuItems(items=[]):MenuItem[] {

    return items.map((item) => ({
      ...normalizeCategoryMenuItem(item),
      items: normalizeMenuItems(get(item, 'childrenCategories', [])),
    }));
  }
  
export default normalizeMenuItems