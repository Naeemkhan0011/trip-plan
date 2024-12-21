import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import config from '../config';
import {goToRoute} from '../components/NavigationRef';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    console.log('enabled :', enabled);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    AsyncStorage.setItem(
      config.AsyncKeys.USER_FCM_TOKEN,
      JSON.stringify(token),
    );
    console.log('fcm token:', token);
  } catch (error) {
    console.log('error in creating token');
  }
};

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)

  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    // id: data?.data?.id,
    name: 'channel_name',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  console.log('channel', channelId);
  // Display a notification
  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
    },
  });
}

export async function notificationListeners() {

 
  //  background message handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  //foreground  message handler
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    onDisplayNotification(remoteMessage);
    handleSetBadge(remoteMessage?.notification?.ios?.badge)
  });
  const handleSetBadge = async (count) => {
    await notifee.setBadgeCount(count);
  };

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );

    if (
      !!remoteMessage?.data &&
      remoteMessage?.data?.type == config.routes.CALLER_NOTIFICATION_LIST
    ) {
      setTimeout(() => {
        console.log('opened');
        goToRoute(config.routes.CALLER_NOTIFICATION_LIST, {
          data: remoteMessage?.data,
        });
      }, 1200);
    }

    if (!!remoteMessage?.data && remoteMessage?.data?.type == 'login') {
      setTimeout(() => {
        goToRoute('Profile', {data: remoteMessage?.data});
      }, 1200);
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    if (result !== RESULTS.GRANTED) {
      const requestResult = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      
      if (requestResult === RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } else {
      console.log('Notification permission already granted');
    }
  }
};