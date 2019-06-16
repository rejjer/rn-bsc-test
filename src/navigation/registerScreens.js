import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as screens from './screens'
import { configureStore } from '../redux'
import Loader from '../components/Loader'

const { store, persistor } = configureStore()

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    )

    return <EnhancedComponent />
  }
}

export default function() {
  Navigation.registerComponent(screens.TAB_LIST.screen, () =>
    WrappedComponent(screens.TAB_LIST.component),
  )
  Navigation.registerComponent(screens.TAB_FAVORITES.screen, () =>
    WrappedComponent(screens.TAB_FAVORITES.component),
  )
}
