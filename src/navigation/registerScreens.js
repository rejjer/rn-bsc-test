import { Navigation } from 'react-native-navigation'
import * as screens from './screens'

export default function() {
  Navigation.registerComponent(
    screens.TAB_LIST.screen,
    () => screens.TAB_LIST.component,
  )
  Navigation.registerComponent(
    screens.TAB_FAVORITES.screen,
    () => screens.TAB_FAVORITES.component,
  )
}
