import {createAction} from '../tools';


export const RESET = 'RESET'
export const SET_LAYOUT= 'SET_LAYOUT'
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE'
export const SET_LAYOUT_AND_DEVIE_TYPE = 'SET_LAYOUT_AND_DEVIE_TYPE'



export const resetClient = createAction(RESET)
export const setLayout = createAction(SET_LAYOUT)
export const setDeviceType = createAction(SET_DEVICE_TYPE)
export const setLayoutDeviceType = createAction(SET_LAYOUT_AND_DEVIE_TYPE)

