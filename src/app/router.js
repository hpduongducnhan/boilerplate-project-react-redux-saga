import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {keys, routes, getRouteByKey, RestrictedRoute} from '../routes';
import {getLayout, types} from '../layouts';

const PRIVATE_URL_PATH_PREFIX = process.env.REACT_APP_PRIVATE_URL_PATH_PREFIX ? process.env.REACT_APP_PRIVATE_URL_PATH_PREFIX : '/admin'

function AppRouter(props){
  /**
   *  App router help to find which layout/component should be display to UI
   *    - authentication url like login, register, logout
   *    - private layout: url path must start with PRIVATE_URL_PATH_PREFIX (default is /admin)
   *    - public layout: other url path 
   * 
   *  Other detail routes defined by each layouts
   */

  const {location, match} = props
  const token = useSelector(s=>s.auth.token)
  const clientLayout = useSelector(s=>s.client.layout)
  const clientDeviceType = useSelector(s=>s.client.deviceType)

  const privateLayout = getLayout(clientLayout.private, types.private, clientDeviceType)
  const publicLayout = getLayout(clientLayout.public, types.public, clientDeviceType)

  return (
    <Switch>
      {getRouteByKey(keys.LOGIN, routes)}
      {getRouteByKey(keys.LOGOUT, routes)}
      {getRouteByKey(keys.REGISTER, routes)}
      {location.pathname.startsWith(PRIVATE_URL_PATH_PREFIX) && <RestrictedRoute component={privateLayout.component} token={token} path={`${match.url}`}/>}
      <Route component={publicLayout.component} />
    </Switch>
  )
}

export default AppRouter;