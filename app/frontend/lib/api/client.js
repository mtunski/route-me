import axios from 'axios'
import { decamelizeKeys } from 'humps'

export const call = (path, method, payload) =>
  axios({
    method,
    url: `http://localhost:3000/api/${path}`,
    data: payload && decamelizeKeys(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
