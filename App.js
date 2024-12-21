import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppLoader from './src/components/AppLoader';
import RootNavigation from './src/navigation/RootNavigation';
import {AppState, Dimensions, StatusBar, Text, View} from 'react-native';
import config from './src/config';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from 'react-native-toast-message';
import { notificationListeners, requestNotificationPermission, requestUserPermission } from './src/services/NotificationService';

const App = () => {
 

  const toastConfig = {
    custom: ({text1}) => (
      <View
        style={{
          borderRadius: 12,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: config.colors.white,
        }}>
        <Text
          style={{
            fontFamily: config.fonts.PoppinsRegular,
            fontSize: 14,
            lineHeight: 20,
            color: config.colors.purpleColor,
          }}>
          {text1}
        </Text>
      </View>
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontFamily: config.fonts.PoppinsRegular,
          fontSize: 14,
          lineHeight: 20,
          color: config.colors.purpleColor,
        }}
        text1NumberOfLines={4}
      />
    ),
    success: props => (
      <SuccessToast
        {...props}
        text1Style={{
          fontFamily: config.fonts.PoppinsRegular,
          fontSize: 14,
          lineHeight: 20,
          color: config.colors.purpleColor,
        }}
        text1NumberOfLines={4}
      />
    ),
  };

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={config.colors.purpleColor}
        translucent={false}
      />
      <RootNavigation />
      <AppLoader />
      <Toast
        config={toastConfig}
        autoHide={true}
        visibilityTime={1500}
        position="bottom"
      />
    </Provider>
  );
};

export default App;
