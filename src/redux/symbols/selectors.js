import R from 'ramda'

const getState = R.prop('symbols')

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

const getFilter = R.pipe(
  getState,
  R.prop('filter'),
)

const getFilteredData = R.pipe(
  getState,
  R.prop('filteredData'),
)

export default {
  getIsFetching,
  getIsError,
  getData,
  getFilter,
  getFilteredData,
}
