import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOGIN } from '../App/constants';
import { loginSuccess, loginError, logout } from '../App/actions';

import { API_URL } from '../../utils/config';

export function* loginSaga(action) {

  const requestURL = `${API_URL}/login`
        , method = 'POST'
        , body = JSON.stringify({ ...action.payload })

  try {
    const res = yield call(request, requestURL, {
      method,
      headers: { 
        'Content-Type': 'application/json'
      },
      body,
    });
    yield put(loginSuccess(res));
    window.location.href = "./users"
  } catch (err) {
    yield put(loginError(err));
    
  }
}

export function* logoutSaga() {
  localStorage.removeItem("auth_token");
  yield put(logout())
  window.location.href = "./"
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN, logoutSaga);
}
