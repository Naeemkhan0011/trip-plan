import React from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../config';
import FastImage from 'react-native-fast-image';

const AppImage = ({imageStyle, type, uri, imageSource, resizeMode}) => {
  return uri ? (
    <FastImage
      style={[styles.image, imageStyle]}
      source={
        uri
          ? {
              uri: uri,
              priority: FastImage.priority.high,
            }
          : imageSource
      }
      resizeMode={
        resizeMode == 'cover'
          ? FastImage.resizeMode.cover
          : FastImage.resizeMode.contain
      }
    />
  ) : (
    <Image style={[styles.image, imageStyle]} source={imageSource} />
  );

  // <Image
  //   style={[styles.image, imageStyle]}
  //   source={uri ? {uri: uri, placeholder: imageSource} : imageSource}
  // />
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default AppImage;
