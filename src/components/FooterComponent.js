import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import config from '../config';

const FooterComponent = ({ data, navigation, notification_count}) => {
  const [from ,setFrom] = useState('home');

  useEffect(() => {
    setFrom(data)
  })
  
  return (
    <ImageBackground
      style={{
        width: config.constants.Width,
        height: 130,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
      }}
      resizeMode="cover"
      source={config.ImageList.footerBackgroundImage}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          marginTop: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFrom('home')
            navigation.navigate(config.routes.HOME_SCREEN);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor:
                from == 'home'
                  ? config.colors.orangeColor
                  : config.colors.white,
            }}
            source={config.ImageList.homeIcon}
          />
          { from == 'home' && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: config.colors.orangeColor,
                marginTop: 10,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFrom('star')
            navigation.navigate(config.routes.REVIEW_AND_RATING);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor:
                from == 'star'
                  ? config.colors.orangeColor
                  : config.colors.white,
            }}
            source={config.ImageList.starIcon}
          />
          {from == 'star' && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: config.colors.orangeColor,
                marginTop: 10,
              }}
            />
          )}
        </TouchableOpacity>
       
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
          }}></TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFrom('discount')
            navigation.navigate(config.routes.DEALS);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor:
                from == 'discount'
                  ? config.colors.orangeColor
                  : config.colors.white,
            }}
            source={config.ImageList.discountIcon}
          />
          {from == 'discount' && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: config.colors.orangeColor,
                marginTop: 10,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFrom('announcement')
            navigation.navigate(config.routes.BANNER_LIST);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor:
                from == 'announcement'
                  ? config.colors.orangeColor
                  : config.colors.white,
            }}
            source={config.ImageList.announcementIcon}
          />
          {from == 'announcement' && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: config.colors.orangeColor,
                marginTop: 10,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFrom('profile')
            navigation.navigate(config.routes.PROFILE);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor:
                from == 'profile'
                  ? config.colors.orangeColor
                  : config.colors.white,
            }}
            source={config.ImageList.profileIcon}
          />
          {from == 'profile' && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: config.colors.orangeColor,
                marginTop: 10,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({});
