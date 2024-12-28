import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import config from '../config';

import { navigationRef } from '../components/NavigationRef';
import Splash from '../screens/splash/Splash';
import SignInScreen from '../screens/SignIn/SignIn';
import SignUpScreen from '../screens/SIgnUp/SignUp';
import OTPVerification from '../screens/SignIn/Otp';
import HomeScreen from '../screens/HomeScreens/HomeScreen';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {Platform.OS == 'android' ? (
          <Stack.Screen name="PushController" component={PushController} />
        ) : (
          <Stack.Screen
            name="PushControllerIos"
            component={PushControllerIos}
          />
          )} */}
        <Stack.Screen name={config.routes.SPLASH} component={Splash} />

        <Stack.Screen name={config.routes.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={config.routes.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen name={config.routes.HOME_SCREEN} component={HomeScreen} />

        <Stack.Screen
          name={config.routes.OTP_VERIFICATION}
          component={OTPVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
