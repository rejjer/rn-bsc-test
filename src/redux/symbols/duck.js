import { createAction, handleActions } from 'redux-actions'
import { getModuleActionName } from '../../utils/helpers'

/* #region Action Types */

const getActionName = getModuleActionName('symbols')

export const REQUEST_SYMBOLS = getActionName('REQUEST_SYMBOLS')
export const REQUEST_SUCCESS = getActionName('REQUEST_SUCCESS')
export const REQUEST_REJECTED = getActionName('REQUEST_REJECTED')
export const CHANGE_FILTER = getActionName('CHANGE_FILTER')
export const UPDATE_FILTERED_DATA = getActionName('UPDATE_FILTERED_DATA')

/* #endregion */

/* #region Action Creators */

export const requestSymbols = createAction(REQUEST_SYMBOLS)
export const requestSuccess = createAction(REQUEST_SUCCESS)
export const requestRejected = createAction(REQUEST_REJECTED)
export const changeSymbolsFilter = createAction(CHANGE_FILTER)
export const updateFilteredData = createAction(UPDATE_FILTERED_DATA)

/* #endregion */

/* #region reducers */

const reducer = handleActions(
  {
    [REQUEST_SYMBOLS]: state => ({ ...state, isFetching: true }),
    [REQUEST_SUCCESS]: (state, { payload: { data, filteredData } }) => ({
      ...state,
      data,
      filteredData,
      isFetching: false,
      isError: false,
    }),
    [REQUEST_REJECTED]: state => ({
      ...state,
      isFetching: false,
      isError: true,
    }),
    [UPDATE_FILTERED_DATA]: (state, { payload: { filter, filteredData } }) => ({
      ...state,
      filter,
      filteredData,
    }),
  },
  {
    data: [],
    filter: '',
    filteredData: [],
    isFetching: false,
    isError: false,
  },
)

/* #endregion */

export default reducer
