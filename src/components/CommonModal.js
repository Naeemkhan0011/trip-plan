import {
  Animated,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import config from '../config';
import LottieView from 'lottie-react-native';
import AppImage from './AppImage';

export const CommonModal = ({
  isCommonModalVisible,
  setIsCommonModalVisible,
  image = '',
  cancelbutton = false,
  title = '',
  subTitle = '',
  FirstButton = '',
  SecondButton = '',
  animatedImage,
  lottie,
  animatedImageStyle,
  buttonContainer,

  navigation,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isCommonModalVisible}
      onRequestClose={() => {
        setIsCommonModalVisible(!isCommonModalVisible);
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(60, 61, 62, 0.8)"
      />
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(60, 61, 62, 0.8)',
        }}>
        <View
          style={{
            width: '80%',
            borderRadius: 20,
            backgroundColor: config.colors.lightOrangeColor,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          {cancelbutton && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsCommonModalVisible(false);
              }}
              style={{ alignSelf: 'flex-end' }}>
              <AppImage
                imageSource={config.ImageList.crossIcon}
                imageStyle={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          )}
          {image && (
            <AppImage
              imageSource={image}
              imageStyle={{
                marginTop: 10,
                width: 100,
                height: 100,
                alignSelf: 'center',
              }}
            />
          )}
          {animatedImage && (
            //  <View style={{
            //   alignItems:'center',
            // }}>
             <Animated.Image
             source={animatedImage}
             
             style={[animatedImageStyle]}
            //  style={{ transform: [{ translateY }] }}
           />
          //  </View>
          )}
          {lottie && (
            <View style={{
              alignItems:'center',
            }}>
            <LottieView
              style={{
                marginTop: 10,
                width: 150,
                height: 150,
              }}
              source={lottie}
              autoPlay
            />
            </View>
          )}
          <Text
            style={{
              fontFamily: config.fonts.PoppinsBold,
              fontSize: 24,
              color: config.colors.purpleColor,
              textAlign: 'center',
              lineHeight: 32,
              marginTop: 10,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: config.fonts.PoppinsRegular,
              fontSize: 14,
              color: config.colors.lightPurpleColor,
              alignSelf: 'center',
              textAlign: 'center',
              lineHeight: 21,
              width: '80%',
              marginTop: 5,
            }}>
            {subTitle}
          </Text>
          <View style={[buttonContainer]}>
            <FirstButton />
            {SecondButton && <SecondButton />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
