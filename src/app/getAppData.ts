import AppData from 'react-storefront-connector/AppData'
import fetchMenuItems from '../menu'

export default async function getAppData(req): Promise<AppData> {
  const numberOfCategoryMenuLevels = 3
  const tabs = await fetchMenuItems(numberOfCategoryMenuLevels, req)
  const appData = { menu: { items: tabs }, tabs }
  return appData
}
