import R from 'ramda'
import AsyncStorage from '@react-native-community/async-storage'
import { all, call } from 'redux-saga/effects'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'

import symbolsReducer, { symbolsSagas } from './symbols'

const rootReducer = combineReducers({
  symbols: symbolsReducer,
})

function* rootSaga() {
  yield all([call(symbolsSagas)])
}

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  timeout: 0,
}

// purgeStoredState(persistConfig)

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const rootPersistReducer = persistReducer(persistConfig, rootReducer)

  const middlewares = R.filter(R.complement(R.isNil), [
    sagaMiddleware,
    __DEV__ ? createLogger({ collapsed: true }) : null,
  ])

  const store = createStore(rootPersistReducer, applyMiddleware(...middlewares))

  const persistor = persistStore(store, null, () => {
    store.getState()
  })

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
