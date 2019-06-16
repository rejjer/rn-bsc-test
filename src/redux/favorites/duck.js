import { createAction, handleActions } from 'redux-actions'
import { getModuleActionName } from '../../utils/helpers'

/* #region Action Types */

const getActionName = getModuleActionName('favorites')

export const REQUEST_QUOTES = getActionName('REQUEST_QUOTES')
export const REQUEST_SUCCESS = getActionName('REQUEST_SUCCESS')
export const REQUEST_REJECTED = getActionName('REQUEST_REJECTED')
export const ADD_TO_FAVORITES = getActionName('ADD_TO_FAVORITES')
export const ADDED_TO_FAVORITES = getActionName('ADDED_TO_FAVORITES')
export const REMOVE_FROM_FAVORITES = getActionName('REMOVE_FROM_FAVORITES')
export const REMOVED_FROM_FAVORITES = getActionName('REMOVED_FROM_FAVORITES')

/* #endregion */

/* #region Action Creators */

export const requestQuotes = createAction(REQUEST_QUOTES)
export const requestSuccess = createAction(REQUEST_SUCCESS)
export const requestRejected = createAction(REQUEST_REJECTED)
export const addToFavorites = createAction(ADD_TO_FAVORITES)
export const addedToFavorites = createAction(ADDED_TO_FAVORITES)
export const removeFromFavorites = createAction(REMOVE_FROM_FAVORITES)
export const removedFromFavorites = createAction(REMOVED_FROM_FAVORITES)

/* #endregion */

/* #region reducers */

const reducer = handleActions(
  {
    [REQUEST_QUOTES]: state => ({ ...state, isFetching: true }),
    [REQUEST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      data,
      isFetching: false,
      isError: false,
    }),
    [REQUEST_REJECTED]: (state, { payload: { data } }) => ({
      ...state,
      data,
      isFetching: false,
      isError: true,
    }),
    [ADDED_TO_FAVORITES]: (state, { payload: { data } }) => ({
      ...state,
      data,
    }),
    [REMOVED_FROM_FAVORITES]: (state, { payload: { data } }) => ({
      ...state,
      data,
    }),
  },
  {
    data: [],
    isFetching: false,
    isError: false,
  },
)

/* #endregion */

export default reducer
