import { api } from '../../constants'

const requestQuotes = symbols =>
  api.REQUEST.get('stock/market/batch', {
    token: api.TOKEN,
    symbols,
    types: 'quote',
    filter: 'symbol,latestPrice,delayedPrice,extendedPrice,high,low',
  })

const checkItemExist = (data, newItem) => {
  let isExist = false
  data.forEach(item => {
    if (item.symbol === newItem.symbol) {
      isExist = true
    }
  })
  return isExist
}

const mergeData = (data, requestData) =>
  data.map(item =>
    requestData[item.symbol] && requestData[item.symbol].quote
      ? { ...requestData[item.symbol].quote, ...item }
      : item,
  )

const removeBySymbol = (data, symbol) =>
  data.filter(item => item.symbol !== symbol)

export default {
  requestQuotes,
  checkItemExist,
  mergeData,
  removeBySymbol,
}
