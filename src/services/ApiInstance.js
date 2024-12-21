import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import config from '../config';
import {SagaActions} from '../redux/sagas/SagaActions';
import {ApiCalls} from './ApiCalls';
import {goToTopNavigation} from '../components/NavigationRef';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const axiosInstance = Axios.create();

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const {
//       config,
//       response: {status},
//     } = error;
//     if (status) {
//       try {
//         // Attempt to refresh the token
//         // await callGenerateNewTokenApi();

//         return axiosInstance(config);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

const callGenerateNewTokenApi = async () => {
  // Add a response interceptor to handle token refresh

  const apiUrl = config.constants.BASE_API_URL + '/auth/generateNewToken';

  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_REFRESH_TOKEN),
  );
  const data = {
    deviceId: await DeviceInfo.getUniqueId(),
    deviceOS: Platform.OS,
    refreshToken: userToken,
  };
  const response = await Axios.put(apiUrl, data, {
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(result => {
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
        AsyncStorage.setItem(
          config.AsyncKeys.USER_TOKEN,
          JSON.stringify(LoginUserResponse?.results?.token),
        );
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', JSON.stringify(error));

      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};
const httpDeleteRequest = async ({apiUrl, jsonBody, apiType}) => {
  let data;
  console.log('apiUrl', apiUrl);
  if (apiType == SagaActions.SIGN_UP_TEAM) {
    data = PrepareFormData(jsonBody);
  } else {
    data = jsonBody;
  }
  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_TOKEN),
  );
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  console.log('apiUrl', userToken);
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  const response = await axiosInstance
    .delete(
      apiUrl,

      {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'x-auth-language': language,
          'x-auth-token-merchant': userToken && userToken,
        },
      },
    )
    .then(result => {
      console.log('result.data===', result.data);
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', JSON.stringify(error));
      if (errorParse?.status == 401) {
        goToTopNavigation(config.routes.LOGIN);
        return {
          result: excep,
          isSucceded: false,
          message: excep,
        };
      }

      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};
const httpPutRequest = async ({apiUrl, jsonBody, apiType}) => {
  let data;
  console.log('apiUrl', apiUrl);
  if (
    apiType == SagaActions.UPDATE_OFFER ||
    apiType == SagaActions.UPDATE_PROMO_CODE ||
    apiType == SagaActions.EDIT_BANNER ||
    apiType == SagaActions.UPDATE_PROFILE ||
    apiType == SagaActions.UPDATE_RESTAURANT
  ) {
    data = PrepareFormData(jsonBody);
    console.log('data', data);
  } else {
    data = jsonBody;
  }
  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_TOKEN),
  );
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  const response = await axiosInstance
    .put(apiUrl, data, {
      headers: {
        Accept: 'application/json',
        'content-type':
          apiType == SagaActions.UPDATE_OFFER ||
          apiType == SagaActions.UPDATE_PROMO_CODE ||
          apiType == SagaActions.EDIT_BANNER ||
          apiType == SagaActions.UPDATE_PROFILE ||
          apiType == SagaActions.UPDATE_RESTAURANT
            ? 'multipart/form-data'
            : 'application/json',
        'x-auth-language': language,
        'x-auth-token-merchant': userToken && userToken,
      },
    })
    .then(result => {
      console.log('result.data===', result.data);
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', JSON.stringify(error));
      if (errorParse?.status == 401) {
        goToTopNavigation(config.routes.LOGIN);
        return {
          result: excep,
          isSucceded: false,
          message: excep,
        };
      }

      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};
const httpPatchRequest = async ({apiUrl, jsonBody, apiType}) => {
  let data;
  console.log('data', data);
  console.log('apiUrl', apiUrl);
  if (
    apiType == SagaActions.SIGN_UP_TEAM ||
    apiType == SagaActions.UPLOAD_LOGO
  ) {
    data = PrepareFormData(jsonBody);
  } else {
    data = jsonBody;
  }
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_TOKEN),
  );
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  const response = await axiosInstance
    .patch(apiUrl, data, {
      headers: {
        Accept: 'application/json',
        'content-type':
          apiType == SagaActions.UPLOAD_LOGO
            ? 'multipart/form-data'
            : 'application/json',
        'x-auth-language': language,
        'x-auth-token-merchant': userToken && userToken,
      },
    })
    .then(result => {
      console.log('ress===', result);
      console.log('result.data===', result.data);
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', JSON.stringify(error));
      if (errorParse?.status == 401) {
        goToTopNavigation(config.routes.LOGIN);
        return {
          result: excep,
          isSucceded: false,
          message: excep,
        };
      }

      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};
const httpPostRequest = async ({apiUrl, jsonBody, apiType}) => {
  let data;
  console.log('apiUrl', apiUrl);
  if (
    apiType == SagaActions.ADD_RESTAURANT ||
    apiType == SagaActions.ADD_OFFER ||
    apiType == SagaActions.ADD_PROMO_CODE ||
    apiType == SagaActions.ADD_RESTAURANT ||
    apiType == SagaActions.ADD_BANNER
  ) {
    data = PrepareFormData(jsonBody);
  } else {
    data = jsonBody;
  }
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_TOKEN),
  );
  console.log('lang', language);
  const response = await axiosInstance
    .post(apiUrl, data, {
      headers: {
        Accept: 'application/json',
        'content-type':
          apiType == SagaActions.ADD_RESTAURANT ||
          apiType == SagaActions.ADD_OFFER ||
          apiType == SagaActions.ADD_PROMO_CODE ||
          apiType == SagaActions.ADD_RESTAURANT ||
          apiType == SagaActions.ADD_BANNER
            ? 'multipart/form-data'
            : 'application/json',
        'x-auth-token-merchant': userToken && userToken,
        'x-auth-language': language,
        ' x-auth-user-type': global.USER_TYPE,
      },
    })
    .then(result => {
      console.log('result.data===', result.data);
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', error);
      if (errorParse?.status == 401) {
        goToTopNavigation(config.routes.LOGIN);
        return {
          result: excep,
          isSucceded: false,
          message: excep,
        };
      }

      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};

const PrepareFormData = body => {
  try {
    const formData = new FormData();
    if (typeof body === 'object') {
      const keys = Object.keys(body);

      keys.forEach(key => {
        if (Array.isArray(body[key])) {
          for (let index = 0; index < body[key].length; index++) {
            let element = body[key][index];

            formData.append(`${key}`, element);
          }
        } else {
          formData.append(key, body[key]);
        }
      });
      return formData;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const httpGetRequest = async ({apiUrl}) => {
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  const userToken = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_TOKEN),
  );
  const response = await axiosInstance
    .get(apiUrl, {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-auth-language': language,
        'x-auth-token-merchant': userToken && userToken,
      },
    })
    .then(result => {
      let isSucceded = false;
      if (result?.data?.error == false) {
        isSucceded = true;
      }
      return {result, isSucceded};
    })
    .catch(error => {
      const excep = error;
      const errorParse = JSON.parse(JSON.stringify(error));
      console.log('Error', JSON.stringify(error));
      if (errorParse?.status == 401) {
        goToTopNavigation(config.routes.LOGIN);
        return {
          result: excep,
          isSucceded: false,
          message: excep,
        };
      }
      return {
        result: excep,
        isSucceded: false,
        message: excep,
      };
    });
  return response;
};

export const callApiService = async (apiType, jsonBody) => {
  const lang = await AsyncStorage.getItem(config.AsyncKeys.USER_LANGUAGE);
  console.log('alkcksjvbfdvfdv', lang);
  let user_id = '';
  let language = '';
  if (lang) {
    language = lang;
  } else {
    language = 'English';
  }
  if (apiType != SagaActions.ADD_RESTAURANT) {
    jsonBody.language = language;
  }
  const request = ApiCalls({apiType});

  let apiUrl = request.requestUrl;
  if (request.requestType === 'POST') {
    if (jsonBody.uri) {
      const extraUriStr = `${jsonBody.uri}`;
      console.log('extraUriStr', extraUriStr);
      apiUrl = `${apiUrl}${extraUriStr}`;
    }

    console.log('Post', jsonBody, apiType);
    const req = await httpPostRequest({apiUrl, jsonBody, apiType});
    return req;
  }
  if (request.requestType === 'PATCH') {
    if (jsonBody.uri) {
      const extraUriStr = `${jsonBody.uri}`;
      console.log('extraUriStr', extraUriStr);
      apiUrl = `${apiUrl}${extraUriStr}`;
    }

    console.log('PATCH', jsonBody, apiType);
    const req = await httpPatchRequest({apiUrl, jsonBody, apiType});
    console.log('PATCH', req);
    return req;
  }
  if (request.requestType === 'DELETE') {
    if (jsonBody.uri) {
      const extraUriStr = `${jsonBody.uri}`;
      console.log('extraUriStr', extraUriStr);
      apiUrl = `${apiUrl}${extraUriStr}`;
    }

    console.log('DELETE', jsonBody, apiType);
    const req = await httpDeleteRequest({apiUrl, jsonBody, apiType});
    return req;
  }
  if (request.requestType === 'PUT') {
    if (jsonBody.uri) {
      const extraUriStr = `${jsonBody.uri}`;
      console.log('extraUriStr', extraUriStr);
      apiUrl = `${apiUrl}${extraUriStr}`;
    }

    console.log('PUT', jsonBody, apiType);
    const req = await httpPutRequest({apiUrl, jsonBody, apiType});
    console.log('req', req);
    return req;
  }
  if (request.requestType === 'GET') {
    if (jsonBody.uri) {
      const extraUriStr = `${jsonBody.uri}`;
      console.log('extraUriStr', extraUriStr);
      apiUrl = `${apiUrl}${extraUriStr}`;
    }
    console.log('Get ', apiUrl);
    const req = await httpGetRequest({apiUrl});
    console.log('req ', req);
    return req;
  }
  return {message: 'error'};
};
