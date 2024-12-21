import React, {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
} from 'react-native-permissions';
import config from '../config';
import {goToRoute} from './NavigationRef';
import Splash from '../screens/splash/Splash';

export const LocalNotification = () => {
  console.log('NOTI');
  PushNotification.localNotification({
    channelId: 'Boutiquei',
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};
export const LocalScheduleNotification = (
  id,
  time,
  title,
  message,
  action,
  data,
) => {
  console.log('NOTISCHEDULE with id ' + id);
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    id: JSON.stringify(id),
    title: title,
    data: {body: message, click_action: action, click_data: data, title: title},
    message: message, // (required)
    date: new Date(Date.now() + time), // in 60 secs
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    onlyAlertOnce: true,
    playSound: true,
    soundName: 'default',
    channelId: 'Boutiquei',
    autoCancel: true,

    /* Android Only Properties */
    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  });
};
export const getScheduleNotification = () => {
  PushNotification.getScheduledLocalNotifications(info =>
    console.log('ffffffffffff', info),
  );
};

export const CancelLocalNotifications = id => {
  console.log('NOTISCHEDULE cancel with id ' + JSON.stringify(id));
  PushNotification.cancelLocalNotification(JSON.stringify(id));
};
const storeFirebaseTokenApi = async fcmToken => {
  await AsyncStorage.setItem(
    config.AsyncKeys.USER_FCM_TOKEN,
    JSON.stringify(fcmToken),
  );
};

const PushController = props => {
  useEffect(() => {
    PushNotification.subscribeToTopic('app-all');
    requestNotificationPermission();
    //PushNotificationIOS.addEventListener('notification', onRemoteNotification);

    PushNotification.createChannel(
      {
        channelId: 'Boutiquei', // (required)
        channelName: 'Boutiquei', // (required)
        channelDescription: 'Boutiquei Notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.getChannels(function (channel_ids) {
      console.log('channel_ids', channel_ids); // ['channel_id_1']
    });
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('PushController Token:', token.token);
        storeFirebaseTokenApi(token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('PushNoti:', notification);

        if (notification.foreground) {
          //showAlert(notification.title, notification.body);
        } else {
          let type = notification.data.type;
          if (
            type == 'ACCEPT_INVITE' ||
            type == 'REJECT_INVITE' ||
            type == 'INVITE'
          ) {
            setTimeout(function () {
              goToRoute(config.routes.MATCH_DETAIL, {
                matchId: notification.data?.id,
                from: 'findResult',
              });
            }, 3100);
          } else if (type == 'CHAT') {
            let partnerTemp = {
              _id: JSON.parse(notification.data?.partner).id,
              name: JSON.parse(notification.data?.partner)?.name,
              profile_image: JSON.parse(notification.data?.partner)
                ?.profile_image,
              chatId: JSON.parse(notification.data?.partner)?.chatId,
              isOnline: JSON.parse(notification.data?.partner)?.isPartnerOnline,
            };
            let userTemp = {
              _id: JSON.parse(notification.data?.user).id,
              name: JSON.parse(notification.data?.user)?.name,
              profile_image: JSON.parse(notification.data?.user)?.profile_image,
              chatId: JSON.parse(notification.data?.user)?.chatId,
              isOnline: JSON.parse(notification.data?.user)?.isUserOnline,
            };
            setTimeout(function () {
              goToRoute(config.routes.SINGLE_CHAT, {
                partnerData: partnerTemp,
                chatId: JSON.parse(notification.data?.partner)?.chatId,
                userData: userTemp,
              });
            }, 3100);
          } else if (type == 'REPLY' || type == 'SUPPORT_STATUS') {
            setTimeout(function () {
              goToRoute(config.routes.HELP_SUPPORT);
            }, 3100);
          }
        }

        // required on iOS only
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '808741973965',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  const requestNotificationPermission = async () => {
    try {
      const res = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

      if (res === 'granted') {
        console.log('You can use notification');
      } else if (res === 'denied') {
        const res2 = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        console.log('res', res2);
      } else if (res === 'blocked') {
        alert('Please enable notification permission from app setting');
        openSettings();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return <Splash {...props} />;
};

export default PushController;
