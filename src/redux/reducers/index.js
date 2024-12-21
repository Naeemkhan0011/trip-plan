import {combineReducers} from '@reduxjs/toolkit';

import * as UIReducer from './UIReducer';
import * as GetProductReducer from './GetProductReducer';

const reducers = combineReducers({
  UIReducer: UIReducer.uiSliceReducer,

  GetProductReducer:GetProductReducer.GetProductSliceReducer,
});

export {
  reducers,
  UIReducer,
  GetProductReducer
};
