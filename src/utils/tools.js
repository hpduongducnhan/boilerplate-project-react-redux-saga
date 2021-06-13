import { consts } from './constants';


export const getData = async function (url, method, headers, body, successCb, errorCb, unAuthorizedCb) {
  const stringifyBody = typeof (body) !== 'string' ? JSON.stringify(body) : body
  const jsonHeaders = {
    ...headers,
    'Content-Type': 'application/json'
  }
  try {
    const response = await fetch(url, {
      crossDomain:true,
      method: method,
      headers: jsonHeaders,
      body: method === consts.GET ? null : stringifyBody
    })
    const jsonData = await response.json()
    if (200 <= response.status && response.status < 300) {
      if (successCb) {
        successCb(jsonData)
      }
    } else
      if (response.status === 401) {
        if (unAuthorizedCb) {
          unAuthorizedCb()
        }

      } else {
        if (errorCb) {
          errorCb(jsonData.error)
        }
      }
  } catch (error) {
    throw error
  }
}

