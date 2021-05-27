import get from 'lodash/get'
import { createCategoryLink } from './createRouteLinks'

// @TODO: move this to util for plp and product?
// Check if this is how we want to generate urls
export function createPDPBreadcrumbs(rawData){
  const breadcrumbs = [
    {
      text: `Home`,
      href: '/',
    }
  ];
  
  const rawCategories = get(rawData, 'data.product.categories',[])
  const productCrumbs = rawCategories.map(category => {
      const name = category?.content?.name
      const slug = get(category, 'content.slug')
      const code = get(category, 'categoryCode')
      return createCategoryLink(name, [slug, code])
    })
  return [...breadcrumbs, ...productCrumbs]
}

/*
*
*/
export function createCategoryBreadcrumbs(categories = []){

  const breadcrumbs = [
    {
      text: `Home`,
      href: '/',
    }
  ];
  const categoryBreadcrumbs = categories.map( category => {
    const name = get(category, 'content.name')
    const slug = get(category, 'content.slug')
    const code = get(category, 'categoryCode')
    return createCategoryLink(name, [slug, code])
  })
  

  return [...breadcrumbs, ...categoryBreadcrumbs]
}