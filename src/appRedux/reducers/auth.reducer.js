import * as act from '../actions/auth.action';


const initialState = {
  token: null,
  username: null,
  refreshToken: null,
  isUnAuthenticated: true,
  // may be firebase token here
}


export const auth = function authReducer(state=initialState, action){
  let p = action.payload
  switch(action.type){
    /** Login Success */
    case act.LOGIN_SUCCESS:
      return {
        ...state,
        token: p.token,
        username: p.username,
        refreshToken: p.refreshToken,
        isUnAuthenticated: false
      }
    /** Logout Success */
    case act.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        username: null,
        refreshToken: null,
        isUnAuthenticated: true,
      }
    /** Set unAuthenticated */
    case act.IS_UNAUTHENTICATED:
      return {
        ...state,
        token: null,
        username: null,
        refreshToken: null,
        isUnAuthenticated: true,
      }

    default: 
      return state
  }
}