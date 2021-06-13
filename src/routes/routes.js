import * as comps from '../components';
import { createRouteData } from './tools';


const types = {
  DEFAULT: 'default',
  MENU: 'menu'
}


export const keys = {
  /** Public */
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',


  /** Private */
}


export const routes = {
  HOME: createRouteData(comps.Home, types.DEFAULT, keys.HOME),
  LOGIN: createRouteData(comps.Login, types.DEFAULT, keys.LOGIN),
  LOGOUT: createRouteData(comps.Logout, types.DEFAULT, keys.LOGOUT),
  REGISTER: createRouteData(comps.Register, types.DEFAULT, keys.REGISTER),
}