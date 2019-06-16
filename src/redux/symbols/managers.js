import { api } from '../../constants'

const requestSymbols = () =>
  api.REQUEST.get('ref-data/symbols', {
    token: api.TOKEN,
    filter: 'symbol,name,iexId',
  })

const filterData = (data, filter) =>
  data.filter(
    ({ name = '', symbol = '' }) =>
      String(name)
        .toUpperCase()
        .includes(String(filter).toUpperCase()) ||
      String(symbol)
        .toUpperCase()
        .includes(String(filter).toUpperCase()),
  )

export default {
  requestSymbols,
  filterData,
}
