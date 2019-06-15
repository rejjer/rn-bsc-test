import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'

import * as screens from './screens'
import { colors, images } from '../constants'

const BOTTOM_TAB_STYLE = {
  ...Platform.select({
    android: {
      iconColor: colors.GRAY,
      selectedIconColor: colors.BLACK,
    },
  }),
  textColor: colors.GRAY,
  selectedTextColor: colors.BLACK,
  fontSize: 10,
  // ios
  iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
  disableIconTint: true,
  disableSelectedIconTint: true,
  // android
  selectedFontSize: 10,
}

const configTopBar = (text = '') => {
  return {
    title: {
      color: colors.BLACK,
      text,
    },
    visible: true,
    animate: false,
    hideOnScroll: false,
    // buttonColor: colors.BLACK,
    drawBehind: false,
    backButton: {
      title: '',
      visible: false,
    },
    background: {
      color: colors.WHITE,
    },
    // ios
    noBorder: true,
    // searchBar: false,
    // android
    height: 60, // TopBar height in dp
    // borderColor: colors.WHITE,
    borderHeight: 0,
    elevation: 0, // TopBar elevation in dp
    topMargin: 0, // top margin in dp
  }
}

const startTabBasedApp = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_LIST.screen,
                    options: {
                      topBar: {
                        ...configTopBar(screens.TAB_LIST.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_LIST.title,
                  icon: images.TAB_LIST,
                  selectedIcon: images.TAB_LIST_SELECTED,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_FAVORITES.screen,
                    options: {
                      topBar: {
                        ...configTopBar(screens.TAB_FAVORITES.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_FAVORITES.title,
                  icon: images.TAB_FAVORITES,
                  selectedIcon: images.TAB_FAVORITES_SELECTED,
                },
              },
            },
          },
        ],
      },
    },
  })
}

export default {
  startTabBasedApp,
}
