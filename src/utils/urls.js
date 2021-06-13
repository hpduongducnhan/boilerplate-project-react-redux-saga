const BACKEND = process.env.REACT_APP_BACKEND_DOMAIN

const genUrl = (path) => BACKEND.concat(path)


export const URLs = {
  /** Backend */
  login: genUrl('/v1/user/login'),
  register: genUrl('/v1/user/signup'),
  validToken: genUrl('/v1/user/whoAmI')
}