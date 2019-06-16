import { takeLatest, all, put, call, select } from 'redux-saga/effects'
import {
  REQUEST_SYMBOLS,
  CHANGE_FILTER,
  requestSuccess,
  requestRejected,
  updateFilteredData,
} from './duck'
import symbolsManagers from './managers'
import symbolsSelectors from './selectors'

function* requestSymbolsSaga() {
  const { ok, data, problem } = yield call(symbolsManagers.requestSymbols)
  if (ok) {
    const filter = yield select(symbolsSelectors.getFilter)
    const filteredData = symbolsManagers.filterData(data, filter)
    yield put(requestSuccess({ data, filteredData }))
  } else {
    yield put(requestRejected({ error: problem }))
  }
}

function* updateFilterDataSaga({ payload: filter }) {
  const data = yield select(symbolsSelectors.getData)
  const previusFilter = yield select(symbolsSelectors.getFilter)
  if (previusFilter !== filter) {
    const filteredData = symbolsManagers.filterData(data, filter)
    yield put(updateFilteredData({ filter, filteredData }))
  }
}

export default function*() {
  yield all([
    takeLatest(REQUEST_SYMBOLS, requestSymbolsSaga),
    takeLatest(CHANGE_FILTER, updateFilterDataSaga),
  ])
}
