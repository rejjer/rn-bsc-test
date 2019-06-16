import apisauce from 'apisauce'

const API_ENDPIONT = 'https://cloud.iexapis.com/stable'

export const TOKEN = 'pk_b38952143dd7425d85b5adfb9e9ba13e'

export const REQUEST = apisauce.create({
  baseURL: API_ENDPIONT,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 60000,
})
