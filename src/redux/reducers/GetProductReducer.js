import {createSlice, createAction} from '@reduxjs/toolkit';

const initialState = {
  GetProductData: null,
  GetProductResponse: null,
};
const saveGetProductData = (state, action) => {
  state.GetProductData = action.payload;
  state.GetProductResponse = null;
};

const saveGetProductResponseData = (state, action) => {
  state.GetProductResponse = action.payload || state.GetProductResponse;
};

const removeGetProductResponseData = state => {
  state.GetProductResponse = null;
  state.GetProductData = null;
};

/*  OtpVerify Slice  */
const GetProductSlice = createSlice({
  name: 'GetProduct',
  initialState,

  reducers: {
    saveGetProduct: saveGetProductData,
    saveGetProductResponse: saveGetProductResponseData,
    removeGetProductResponse: removeGetProductResponseData,
  },
});

// Get actions from created OtpVerify Slice
const {saveGetProduct, saveGetProductResponse, removeGetProductResponse} =
  GetProductSlice.actions;

const GetProductSliceReducer = GetProductSlice.reducer;

const selectGetProductData = ({GetProductReducer}) =>
  GetProductReducer.GetProductData ?? null;
const selectGetProductResponse = ({GetProductReducer}) =>
  GetProductReducer.GetProductResponse ?? null;

export {
  GetProductSliceReducer,
  saveGetProduct,
  saveGetProductResponse,
  removeGetProductResponse,
  selectGetProductData,
  selectGetProductResponse,
};
