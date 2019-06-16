import { takeLatest, all, put, call, select } from 'redux-saga/effects'
import {
  REQUEST_QUOTES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  requestQuotes,
  requestSuccess,
  requestRejected,
  addedToFavorites,
  removedFromFavorites,
} from './duck'
import favoritesManagers from './managers'
import favoritesSelectors from './selectors'

function* requestQuotesSaga() {
  let favoritesData = yield select(favoritesSelectors.getData)
  const symbols = favoritesData.map(({ symbol = '' }) => symbol).join(',')
  const { ok, data, problem } = yield call(
    favoritesManagers.requestQuotes,
    symbols,
  )
  if (ok) {
    const resultData = favoritesManagers.mergeData(favoritesData, data)
    yield put(requestSuccess({ data: resultData }))
  } else {
    yield put(requestRejected({ error: problem, data: favoritesData }))
  }
}

function* addToFavoritesSaga({ payload: { symbol, name } }) {
  let data = yield select(favoritesSelectors.getData)
  const isExist = favoritesManagers.checkItemExist(data, {
    symbol,
  })
  if (!isExist) {
    yield put(addedToFavorites({ data: [...data, { symbol, name }] }))
    yield put(requestQuotes())
  }
}

function* removeFromFavoritesSaga({ payload: { symbol } }) {
  let data = yield select(favoritesSelectors.getData)
  data = favoritesManagers.removeBySymbol(data, symbol)
  yield put(removedFromFavorites({ data }))
}

export default function*() {
  yield all([
    takeLatest(REQUEST_QUOTES, requestQuotesSaga),
    takeLatest(ADD_TO_FAVORITES, addToFavoritesSaga),
    takeLatest(REMOVE_FROM_FAVORITES, removeFromFavoritesSaga),
  ])
}
