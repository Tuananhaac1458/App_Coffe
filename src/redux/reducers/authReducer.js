import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, LOGIN, LOGIN_CALLBACK, LOGOUT, LOGOUT_CALLBACK } from '../constants';


const initialState = {
  user: {},
  queue: {},
  validateStatus: 0,
  validateResult: '',
};