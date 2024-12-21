import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';

const NoData = ({text, visible,text1}) => {
  const {t, i18n} = useTranslation();
  return (
    visible && (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain',
          }}
          source={config.ImageList.noDataIcon}
        />
        <Text
          style={{
            fontFamily: config.fonts.PoppinsSemiBold,
            fontSize: 16,
            color: config.colors.purpleColor,
            lineHeight: 24,
            textAlign: 'center',
          }}>
          {text ?? t('No Data Found!')}
        </Text>
        <Text
          style={{
            fontFamily: config.fonts.PoppinsRegular,
            fontSize: 12,
            color: config.colors.lightPurpleColor,
            lineHeight: 20,
            textAlign: 'center',
          }}>
          {text1}
        </Text>
      </View>
    )
  );
};

export default NoData;

const styles = StyleSheet.create({});
