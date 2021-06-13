import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import {logoutSuccess} from '../../appRedux/actions/auth.action';
import {resetClient} from '../../appRedux/actions/client.action';

export function Logout(){
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(logoutSuccess())
    dispatch(resetClient())
  }, [])
  
  return (
    <div className='auth-container'>
      <div className='auth-logout'>
        <div className='message'>
          <span>You logged out</span>
        </div>
        <button onClick={()=>{
          history.push('/')
        }}> Click me</button>
      </div>
    </div>
  )
}