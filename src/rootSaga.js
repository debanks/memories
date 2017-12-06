import { fork } from 'redux-saga/effects'
import headerSaga from './header/headerSaga';
import homeSaga from './home/homeSaga';
import globalSaga from './global/globalSaga';
import apiSaga from './api/apiSaga';

function* frontendSaga() {
  yield [
      fork(headerSaga),
      fork(homeSaga),
      fork(globalSaga),
      fork(apiSaga)
  ];
}

export default frontendSaga;