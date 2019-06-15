import { APP_NAME } from '../constants/names'

import TabList from '../screens/TabList'
import TabFavorites from '../screens/TabFavorites'

export const TAB_LIST = {
  title: 'List',
  screen: `${APP_NAME}.TabList`,
  component: TabList,
}

export const TAB_FAVORITES = {
  title: 'Favorites',
  screen: `${APP_NAME}.TabFavorites`,
  component: TabFavorites,
}
