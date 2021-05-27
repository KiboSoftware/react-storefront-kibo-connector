import AppData from 'react-storefront-connector/AppData';
import fetchMenuItems from '../menu'
  
export default async function getAppData(): Promise<AppData> {
    const numberOfCategoryMenuLevels = 3
    const tabs = await fetchMenuItems(numberOfCategoryMenuLevels);
    const appData = { menu: {items: tabs } , tabs }
    return appData;
}