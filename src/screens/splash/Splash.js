import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import config from '../../config'
import AppImage from '../../components/AppImage';

const Splash = ({ navigation }) => {


  setTimeout(() => {
    // navigation.navigate(config.routes.CHOOSE_LANGUAGE)
  }, 3000);
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: config.colors.white
    }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={config.colors.white}
      />
      <AppImage
        imageSource={config.ImageList.appLogo}
        imageStyle={{
          width: 250,
          height: 250,
        }}
      />
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({})