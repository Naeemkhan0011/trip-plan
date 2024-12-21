import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import config from '../config';

import { navigationRef } from '../components/NavigationRef';
import Splash from '../screens/splash/Splash';


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
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
