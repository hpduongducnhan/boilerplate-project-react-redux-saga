import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { postLogin, validToken } from '../../utils/fetch-api';
import * as authAction from '../../appRedux/actions/auth.action';


const redirectToNext = (history, location, defaultPath) => {
  /**
   *  Redirect to /admin or from where user need authenticate to do their action
   */
  if (location.hasOwnProperty('state') && location.state) {
    if (location.state.hasOwnProperty('from') && location.state.from) {
      if (location.state.from.hasOwnProperty('pathname') && location.state.from.pathname) {
        history.push(location.state.from.pathname)
      }
    }
  }
  history.push(defaultPath)
}


export function Login(props) {
  const { t, history, location } = props
  const dispath = useDispatch()
  const token = useSelector(s => s.auth.token)
  const refreshToken = useSelector(s => s.auth.refreshToken)

  const [loading, setLoading] = useState(true)


  /** Component did mount */
  useEffect(() => {
    console.log('did mount')
    if (!token) {  // no token, let user input username, password
      console.log('no token')
      setLoading(false)
    } else {    // has token, valid it
      validToken(
        token,
        (data) => { // valid token and token valid
          console.log('valid token success')
          // let ComponentDidUpdate redirect to next page or default page
          setLoading(false)
        },
        (error) => {  // token dont valid          
          console.log('valid token error')
          if (refreshToken) {  // has refresh token, let get access token
            console.log('should get access token from refresh Token')
          } else {  // let user input
            dispath(authAction.setIsUnAuthenticated())
            setLoading(false)
          }
        }
      )
    }
  }, [])

  /** component did update check login is success */
  useEffect(() => {
    console.log('did update')
    if (token) {
      // login success -> go to default page or next page
      redirectToNext(history, location, '/admin')
    }
  }, [token])


  /** Click button submit to request login */
  const onFormSubmit = (values) => {
    console.log('Success:', values);
    postLogin(
      { email: values.username, password: values.password },
      (data) => {
        console.log('login success', data)
        dispath(authAction.loginSuccess({
          token: data.token,
          username: values.username,
          refreshToken: data.refreshToken ? data.refreshToken : null,
        }))
      },
      (error) => {
        console.log('login error', error)
      }
    )
  };

  /** User input error */
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  /** Click remember me */
  const onRememberChange = (event) => {
    console.log('onRememberChange', event.target.checked)
  }

  return (
    <div className='auth-container'>
      <div className='auth-login'>
        <Spin spinning={loading} size='large' className='spin'>
          <div className='title'>
            <span>Login</span>
          </div>
          <div className='form'>
            <Form
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFormSubmit}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password "
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox onChange={onRememberChange}>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" >Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  )
}