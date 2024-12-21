import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import config from '../config';

import { Image, Platform, Text, View } from 'react-native';
import Home from '../screens/home/Home';
import Category from '../screens/category/Category';
import Cart from '../screens/cart/Cart';
import Account from '../screens/account/Account';
import Wishlist from '../screens/wishlist/Wishlist';


const Tab = createBottomTabNavigator();


const TabNavigator = ({ route }) => {

    console.log('GuideTabs', 'GuideTabs');

    return (
        <Tab.Navigator
            initialRouteName={config.routes.HOME_SCREEN}
            screenOptions={{
                tabBarStyle: {

                    height: Platform.OS == 'android' ? 58 : 78,
                    backgroundColor: config.colors.white,
                },
                headerShown: false,
                tabBarShowLabel: false,
            }}>
            <Tab.Screen
                name={config.routes.HOME_SCREEN}
                component={Home}
                options={{
                    tabBarLabel: config.routes.HOME_SCREEN,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                           
                            alignItems:'center',
                            width:70,
                        }}>
                            <View style={{
                                marginTop:4,
                                width: 56,
                                height:4,
                                backgroundColor:focused ? config.colors.primaryColor : config.colors.white,
                            }}></View>
                            <Image
                                source={config.ImageList.homeIcon}
                                style={{ height: 23, width: 23, resizeMode: 'contain', tintColor: focused ? config.colors.primaryColor : config.colors.greyColor }}
                            />
                            <View style={{ justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        textAlign:'center',
                                        fontFamily:focused ? config.fonts.InterMedium : config.fonts.InterRegular,
                                        fontSize: 10,
                                        lineHeight: 16,
                                        marginLeft: 6,
                                        color: focused ? config.colors.primaryColor : config.colors.greyColor,
                                        justifyContent: 'center',
                                    }}>
                                    {'Home'}
                                </Text>
                            </View>
                        </View>
                    ),
                }}
            />


            <Tab.Screen
                name={config.routes.CATEGORY}
                component={Category}
                options={{
                    tabBarLabel: config.routes.CATEGORY,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                           
                            alignItems:'center',
                            width:70,
                        }}>
                            <View style={{
                                marginTop:4,
                                width: 56,
                                height:4,
                                backgroundColor:focused ? config.colors.primaryColor : config.colors.white,
                            }}></View>

                            <Image
                                source={config.ImageList.categoryIcon}
                                style={{ height: 23, width: 23, marginLeft: 4, resizeMode: 'contain', tintColor: focused ? config.colors.primaryColor : config.colors.greyColor }}
                            />

                            <View style={{ justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily:focused ? config.fonts.InterMedium : config.fonts.InterRegular,
                                        fontSize: 10,
                                        lineHeight: 16,
                                        marginLeft: 6,
                                        color: focused ? config.colors.primaryColor : config.colors.greyColor,
                                        justifyContent: 'center',
                                    }}>
                                    {'My Package'}
                                </Text>
                            </View>
                        </View>
                    ),
                }}
            />



            <Tab.Screen
                name={config.routes.CART}
                component={Cart}
                options={{
                    tabBarLabel: config.routes.CART,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                           
                            alignItems:'center',
                            width:70,
                        }}>
                            <View style={{
                                marginTop:4,
                                width: 56,
                                height:4,
                                backgroundColor:focused ? config.colors.primaryColor : config.colors.white,
                            }}></View>

                            <Image
                                source={config.ImageList.cartIcon}
                                style={{ height: 23, width: 23, marginLeft: 4, resizeMode: 'contain', tintColor: focused ? config.colors.primaryColor : config.colors.greyColor }}
                            />

                            <View style={{ justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily:focused ? config.fonts.InterMedium : config.fonts.InterRegular,
                                        fontSize: 10,
                                        lineHeight: 16,
                                        marginLeft: 6,
                                        color: focused ? config.colors.primaryColor : config.colors.greyColor,
                                        justifyContent: 'center',
                                    }}>
                                    {'Cart'}
                                </Text>
                            </View>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name={config.routes.WISHLIST}
                component={Wishlist}
                options={{
                    tabBarLabel: config.routes.WISHLIST,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                           
                            alignItems:'center',
                            width:70,
                        }}>
                            <View style={{
                                marginTop:4,
                                width: 56,
                                height:4,
                                backgroundColor:focused ? config.colors.primaryColor : config.colors.white,
                            }}></View>

                            <Image
                                source={config.ImageList.heartIcon}
                                style={{ height: 23, width: 23, marginLeft: 4, resizeMode: 'contain', tintColor: focused ? config.colors.primaryColor : config.colors.greyColor }}
                            />

                            <View style={{ justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily:focused ? config.fonts.InterMedium : config.fonts.InterRegular,
                                        fontSize: 10,
                                        lineHeight: 16,
                                        marginLeft: 6,
                                        color: focused ? config.colors.primaryColor : config.colors.greyColor,
                                        justifyContent: 'center',
                                    }}>
                                    {'Wishlist'}
                                </Text>
                            </View>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name={config.routes.ACCOUNT}
                component={Account}
                options={{
                    tabBarLabel: config.routes.ACCOUNT,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                           
                            alignItems:'center',
                            width:70,
                        }}>
                            <View style={{
                                marginTop:4,
                                width: 56,
                                height:4,
                                backgroundColor:focused ? config.colors.primaryColor : config.colors.white,
                            }}></View>

                            <Image
                                source={config.ImageList.userIcon}
                                style={{ height: 23, width: 23, marginLeft: 4, resizeMode: 'contain', tintColor: focused ? config.colors.primaryColor : config.colors.greyColor }}
                            />

                            <View style={{ justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontFamily:focused ? config.fonts.InterMedium : config.fonts.InterRegular,
                                        fontSize: 10,
                                        lineHeight: 16,
                                        marginLeft: 6,
                                        color: focused ? config.colors.primaryColor : config.colors.greyColor,
                                        justifyContent: 'center',
                                    }}>
                                    {'Account'}
                                </Text>
                            </View>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
