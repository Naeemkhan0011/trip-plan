import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import config from '../config';
import AppImage from './AppImage';
import { useTranslation } from 'react-i18next';

const AppButton = ({
  leftImageSource,
  leftImageStyle,
  rightImageSource,
  rightImageStyle,
  buttonStyle,
  textStyle,
  text,
  onPress,
  disabled,
}) => {
  const {t,i18n} = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, buttonStyle]}>
      {leftImageSource && (
        <AppImage
          imageSource={leftImageSource}
          imageStyle={[
            {width: 16, height: 16, marginHorizontal: 5},
            leftImageStyle,
          ]}
        />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {rightImageSource && (
        <AppImage
          imageSource={rightImageSource}
          imageStyle={[
            { width: 16, height: 16, marginHorizontal: 5,
               transform: [{ rotate: i18n.language == 'ar' ? '180deg' : '0deg' }]
               },
            rightImageStyle,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // marginHorizontal: 20,
  },
  button: {
    borderRadius: 10,
    height: 48,
    backgroundColor: config.colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    color: config.colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: config.fonts.PoppinsSemiBold,
    lineHeight: 24,
  },
});

export default AppButton;
