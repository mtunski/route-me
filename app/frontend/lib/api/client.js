/* global API_HOST */

import axios from 'axios'
import { decamelizeKeys } from 'humps'

export const call = (path, method, payload) =>
  axios({
    method,
    url: `${API_HOST}/api/${path}`,
    data: payload && decamelizeKeys(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
