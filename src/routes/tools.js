import { Route, Redirect, matchPath } from 'react-router-dom';



export const getRoutesType = (type, routes) => {
  let result = []
  for (let route in routes) {
    let tmp = routes[route]
    if (tmp.type.includes(type)) {
      result.push(<Route exact={tmp.exact} path={tmp.path} component={tmp.component}/>)
    }
  }
  return result
}


export const getRouteByKey = (key, routes) => {
  for (let route in routes){
    // console.log(route)
    let tmp = routes[route]
    if (tmp.key === key){
      // console.log('got route ', route)
      return <Route exact={tmp.exact} path={tmp.path} component={tmp.component}/>
    }
  }
}


export const createRouteData = (Component, type, path, key, isExact = true) => {
  if (!Array.isArray(type) && typeof (type) !== 'string') {
    throw 'type must be string or string[]'
  }
  if (typeof (path) !== 'string' ||  typeof (isExact) !== 'boolean') {
    throw 'path must be string, isExact must be boolean'
  }

  if (!Array.isArray(type)) {
    type = [type]
  }
  return {
    component: Component,
    exact: isExact,
    key: key ? key : path,
    path: path,
    type: type
  }
}


export function RedirectToLogin({location, targetPath}){
  /**
   * Redirect to Login page
   */
  return <Redirect to={{
      pathname: targetPath ? targetPath : '/login',
      state:{ from: location}
  }}/>
}


export function RestrictedRoute({ component: Component, token, ...rest }) {
  /**
   * If user is NOT logged in -> do NOT allow 
   */
  console.log('over RestrictedRoute ')
  return (
    <Route
      {...rest}
      render={props =>
        token
          ? <Component {...props} />
          : <RedirectToLogin location={props.location} />}
    />
  )
}