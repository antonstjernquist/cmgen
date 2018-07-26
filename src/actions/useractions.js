import { LOGIN, LOGOUT } from './constants.js';
export const actionLogin = user => {
  return {
    type: LOGIN,
    data: user
  }
}
export const actionLogout = () => {
  return {
    type: LOGOUT
  }
}
