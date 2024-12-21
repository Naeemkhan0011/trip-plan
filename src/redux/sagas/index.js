import {all, fork} from 'redux-saga/effects';

import { watchGetProduct } from './GetProductSaga';
;

export default function* rootSaga() {
  return yield all([
    fork(watchGetProduct)

  ]);
}
