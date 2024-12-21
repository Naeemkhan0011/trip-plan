import { SagaActions } from '../redux/sagas/SagaActions';
import ApiUrls from './ApiUrls';

export const ApiCalls = ({ apiType }) => {
  let requestType = '';
  let requestUrl = '';
  switch (apiType) {
    /* POST request */
    // case SagaActions.GET_PRODUCT:
    //   requestType = 'POST';
    //   requestUrl = ApiUrls.SIGN_UP_USER_URL;
    //   break;

    

    /* PUT request */
    case SagaActions.UPDATE_PROFILE:
      requestType = 'PUT';
      requestUrl = ApiUrls.UPDATE_PROFILE_URL;
      break;

   
    /* GET request */

    case SagaActions.VIEW_PRODUCT:
      requestType = 'GET';
      requestUrl = ApiUrls.VIEW_PRODUCT_URL;
      break;

    
    /* PATCH request */
    case SagaActions.GET_PRODUCT:
      requestType = 'PATCH';
      requestUrl = ApiUrls.GET_PRODUCT_URL;
      break;
    
    /* DELETE request */
    case SagaActions.DELETE_OFFER:
      requestType = 'DELETE';
      requestUrl = ApiUrls.DELETE_OFFER_URL;
      break;
    

    default:
      requestType = '';
      requestUrl = '';
      break;
  }
  return { requestType, requestUrl };
};
