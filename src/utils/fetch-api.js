import {getData} from './tools';
import {URLs} from './urls';
import {consts} from './constants';


export const postLogin = (body, successCb, errorCb, unAuthCb) => {
  getData(
    URLs.login,
    consts.POST,
    {},
    body,
    successCb,
    errorCb,
    unAuthCb
  )
}


export const getAccessToken = (body, successCb, errorCb, unAuthCb) => {

}


export const validToken =  (token, successCb, errorCb, unAuthCb) => {
  getData(
    URLs.validToken,
    consts.GET,
    {"Authorization": `Bearer ${token}`},
    {},
    successCb,
    errorCb,
    unAuthCb
  )
}

export const postRegister = (body, successCb, errorCb, unAuthCb) => {
  getData(
    URLs.register,
    consts.POST,
    {},
    body,
    successCb,
    errorCb,
    unAuthCb
  )
}
