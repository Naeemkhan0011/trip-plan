import {takeLatest, call, put} from 'redux-saga/effects';
import {SagaActions} from './SagaActions';
import {callApiService} from '../../services/ApiInstance';
import {UIReducer} from '../reducers';
import { saveGetProduct, saveGetProductResponse } from '../reducers/GetProductReducer';

export function* GetProduct(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.GET_PRODUCT,
    action.payload,
  );
  console.log('GET_PRODUCT', JSON.stringify(data?.result?.data));
  if (data.isSucceded) {
    yield put(saveGetProduct(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const GetProductResponse = {
    status: false,
    message: data?.result?.data?.message ?? 'Server Error!!',
  };
  yield put(saveGetProductResponse(GetProductResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch GetProduct function
 */
export function* watchGetProduct() {
  yield takeLatest(SagaActions.GET_PRODUCT, GetProduct);
}
