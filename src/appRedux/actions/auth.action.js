import {createAction} from '../tools';

export const RESET = 'RESET'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const IS_UNAUTHENTICATED = 'IS_UNAUTHENTICATED'


export const resetAuth = createAction(RESET)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)
export const setIsUnAuthenticated = createAction(IS_UNAUTHENTICATED)


