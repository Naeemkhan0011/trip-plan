import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import config from '../config';

const AppHeader = ({
  title,
  subTitle = '',
  navigation,
  rightimg,
  rightimgstyle,
  rightText = '',
  leftImageEnabled = true,
  onRightPress,
  onPress,
  tintColor,
  color,
  fontFamily,
  backgroundColor,
  viewHeight,
  rightTextColor,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        {height: viewHeight ? viewHeight : 56},
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : config.colors.white,
        },
        containerStyle,
      ]}>
      {leftImageEnabled && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => (onPress ? onPress() : navigation.goBack())}>
          <Image
            source={config.ImageList.rightArrowIcon}
            style={[
              styles.backimgStyle,
              {
                tintColor: tintColor && tintColor,
                transform: [{ rotate: '180deg' }],
              },
            ]}
          />
        </TouchableOpacity>
      )}

      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          style={[
            styles.textStyle,
            {
              color: color ? color : config.colors.primaryColor,
              fontFamily: fontFamily
                ? fontFamily
                : config.fonts.InterSemiBold,
            },
          ]}>
          {title}
        </Text>
        {subTitle && <Text style={[styles.subTextStyle]}>{subTitle}</Text>}
      </View>

      {rightimg && (
        <TouchableOpacity activeOpacity={0.6} onPress={onRightPress}>
          <Image source={rightimg} style={[styles.rightimgStyle,rightimgstyle]} />
        </TouchableOpacity>
      )}

      {rightText && (
        <TouchableOpacity activeOpacity={0.6} onPress={onRightPress}>
          <Text
            style={[
              { color: rightTextColor ? rightTextColor : config.colors.primaryColor,},
              {
              fontFamily: config.fonts.InterMedium,
             
              fontSize: 14,
              lineHeight: 21,
            }]}>
            {rightText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // height: 60,
    paddingHorizontal: 15,
    // marginVertical: 10,
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',

    color: config.colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  subTextStyle: {
    fontFamily: config.fonts.MontserratMedium,
    color: config.colors.greyColor,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 4,
    width: '100%',
  },
  backimgStyle: {
    width: 24,
    height: 24,
    transform:[{rotate: '80deg'}],
    resizeMode: 'contain',
  },
  rightimgStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    // right: 10,
  },
});
