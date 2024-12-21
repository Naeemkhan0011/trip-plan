import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import {goToRoute} from './NavigationRef';
import Splash from '../screens/splash/Splash';

export const LocalScheduleNotificationIos = (
  id,
  title,
  subtitle,
  time,
  data,
  action,
) => {
  console.log('NOTISCHEDULE with id ' + id);
  PushNotificationIOS.addNotificationRequest({
    id: JSON.stringify(id),
    title: title,
    subtitle: subtitle,
    fireDate: new Date(Date.now() + time),
    userInfo: {
      click_data: data,
      click_action: action,
      date: JSON.stringify(new Date(Date.now() + time)),
    },
  });
};
export const CancelLocalNotificationsIOS = id => {
  console.log('NOTISCHEDULE cancel with id ' + JSON.stringify(id));
  PushNotificationIOS.removePendingNotificationRequests([JSON.stringify(id)]);
};
const PushControllerIos = props => {
  useEffect(() => {
    requestNotificationPermission();
    registeredNotificationEvent();
    //checkFcmPermission();

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('handle in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;
      PushNotificationIOS.addNotificationRequest({
        id: messageId,
        body: notification.body,
        title: notification.title,
        sound: 'default',
      });
    });
    return unsubscribe;
  }, []);

  const getTokenFromFirebase = async () => {
    // messaging().setAPNSToken('app-all')
    await messaging()
      .getToken()
      .then(token => {
        console.log('firebase ios token', token);
        storeFirebaseTokenApi(token);
      });
    // PushNotificationIOS.addNotificationRequest({
    //   id: '12',
    //   body: 'notification.body',
    //   title: 'notification.title',
    //   subtitle: 'notification.tsubitle',
    //   sound: 'defaultT',
    //   fireDate:new Date(Date.now()+10000)
    // });

    messaging()
      .subscribeToTopic('app-all')
      .then(() => console.log('Subscribed to topic with ios!'));
  };
  const requestNotificationPermission = () => {
    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      data => {
        getTokenFromFirebase();
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      data => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );
  };

  const registeredNotificationEvent = () => {
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    );
  };

  const storeFirebaseTokenApi = async fcmToken => {
    await AsyncStorage.setItem(
      config.AsyncKeys.USER_FCM_TOKEN,
      JSON.stringify(fcmToken),
    );
  };
  const onRegistered = deviceToken => {
    console.log('deviceTokenIOS', deviceToken);
  };

  const onRegistrationError = error => {
    console.log('error', error);
  };

  const onLocalNotification = notification => {
    console.log('local notification', notification);
    // let click_action = notification.getData().click_action;
    // let click_data = notification.getData().click_data;
  };
  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
      let type = notification?.getData().type;

      if (
        type == 'ACCEPT_INVITE' ||
        type == 'REJECT_INVITE' ||
        type == 'INVITE'
      ) {
        setTimeout(function () {
          goToRoute(config.routes.MATCH_DETAIL, {
            matchId: notification.getData()?.id,
            from: 'findResult',
          });
        }, 3100);
      } else if (type == 'CHAT') {
        let partnerTemp = {
          _id: JSON.parse(notification.getData()?.partner).id,
          name: JSON.parse(notification.getData()?.partner)?.name,
          profile_image: JSON.parse(notification.getData()?.partner)
            ?.profile_image,
          chatId: JSON.parse(notification.getData()?.partner)?.chatId,
          isOnline: JSON.parse(notification.getData()?.partner)
            ?.isPartnerOnline,
        };
        let userTemp = {
          _id: JSON.parse(notification.getData()?.user).id,
          name: JSON.parse(notification.getData()?.user)?.name,
          profile_image: JSON.parse(notification.getData()?.user)
            ?.profile_image,
          chatId: JSON.parse(notification.getData()?.user)?.chatId,
          isOnline: JSON.parse(notification.getData()?.user)?.isUserOnline,
        };
        setTimeout(function () {
          goToRoute(config.routes.SINGLE_CHAT, {
            partnerData: partnerTemp,
            chatId: JSON.parse(notification.getData()?.partner)?.chatId,
            userData: userTemp,
          });
        }, 3100);
      } else if (type == 'REPLY' || type == 'SUPPORT_STATUS') {
        setTimeout(function () {
          goToRoute(config.routes.HELP_AND_SUPPORT);
        }, 3100);
      }
    } else {
      // Do something else with push notification
    }
  };

  return <Splash {...props} />;
};

export default PushControllerIos;
