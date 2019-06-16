import R from 'ramda'

const getState = R.prop('favorites')

const getIsFetching = R.pipe(
  getState,
  R.prop('isFetching'),
)

const getIsError = R.pipe(
  getState,
  R.prop('isError'),
)

const getData = R.pipe(
  getState,
  R.prop('data'),
)

export default {
  getIsFetching,
  getIsError,
  getData,
}
