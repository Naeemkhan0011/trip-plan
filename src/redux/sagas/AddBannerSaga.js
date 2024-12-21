import {takeLatest, call, put} from 'redux-saga/effects';
import {SagaActions} from './SagaActions';
import {callApiService} from '../../services/ApiInstance';
import {UIReducer} from '../reducers';
import { saveAddBanner, saveAddBannerResponse } from '../reducers/AddBannerReducer';

export function* AddBanner(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.ADD_BANNER,
    action.payload,
  );
  console.log('ADD_BANNER', JSON.stringify(data?.result?.data));
  if (data.isSucceded) {
    yield put(saveAddBanner(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const AddBannerResponse = {
    status: false,
    message: data?.result?.data?.message ?? 'Server Error!!',
  };
  yield put(saveAddBannerResponse(AddBannerResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch AddBanner function
 */
export function* watchAddBanner() {
  yield takeLatest(SagaActions.ADD_BANNER, AddBanner);
}
