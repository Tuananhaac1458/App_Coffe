
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { 
		createAppContainer,
		createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
	} from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconn from 'react-native-vector-icons/Feather'
import Iconnn from 'react-native-vector-icons/AntDesign'
///////////////////
import HeaderBar from './containers/HeaderBar'
///////////////////
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import StoreScreen from './screens/StoreScreen'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import IntroScreen from './screens/IntroScreen'
import MapScreen from './screens/MapScreen'



import ModalHome from './screens/Modal/ModalHome'
import ModalStore from './screens/Modal/ModalStore'
import ModalProfile from './screens/Modal/ModalProfile'

import ModalSearch from './screens/Modal/ModalSearch'

import { COLOR_HIGTHPERLINK } from './util/ValueString'
import { fadeIn } from 'react-navigation-transitions';

////////////////////

//////////////////
const HomeScreenStack  = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions:({ navigation }) => {
        const propsDefault = {
          ...navigation,
          Router:{
            routeName:navigation.state.routeName
          }
        }
        return{
            header: <HeaderBar { ...propsDefault }/>
        }
      }
    },
    ModalHome:{
      screen: ModalHome,
      navigationOptions:({ navigation }) => {
        return{
          header: null,
        }
      },
    }
  },
  {
      defaultNavigationOptions: {
        headerTintColor: '#000', /// color back 
        headerStyle: {
          backgroundColor: '#FFF',/// color head 
        }
      },
  }

)
//////////////////////////////////////////////
const StoreScreenStack  = createStackNavigator(
  {
    Store: {
      screen: StoreScreen,
      navigationOptions:({ navigation }) => {
        const propsDefault = {
          ...navigation,
          Router:{
            routeName:navigation.state.routeName
          }
        }
        return{
            // header: <HeaderBar { ...propsDefault }/>
            header: null
        }
      }
    },
    ModalStore:{
      screen: ModalStore,
      navigationOptions:({ navigation }) => {
        return{
          header: null,
        }
      },
    },
    ModalSearch:{
      screen: ModalSearch,
      navigationOptions:({ navigation }) => {
        return{
          header: null,
        }
      },
    }
  },
  {     
      initialRouteName: 'Store',
      transitionConfig: () => fadeIn(),
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#f20',
        },
      },
  },
)

//////////////////////////////////////////
const ProfileScreenStack  = createStackNavigator(
  {
    ProFile: {
      screen: ProfileScreen,
      navigationOptions:({ navigation }) => {
        const propsDefault = {
          ...navigation,
          Router:{
            routeName:navigation.state.routeName
          }
        }
        return{
            header: null
        }
      }
    },
    ModalProfile:{
      screen: ModalProfile,
      navigationOptions:({ navigation }) => {
        return{
          header: null,
        }
      },
    }
    // DetailHome:{
    //   screen: DetailHome
    // }
  },
  {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#f20',
        },
      },
  },
)

//////////////////////////////////////////
const MapScreenStack  = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions:({ navigation }) => {
        const propsDefault = {
          ...navigation,
          Router:{
            routeName:navigation.state.routeName
          }
        }
        return{
            header: null
        }
      }
    },
    // DetailHome:{
    //   screen: DetailHome
    // }
  },
  {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#f20',
        },
      },
  },
)
const TabNavigator = createBottomTabNavigator(  
  {
      Home:{
        screen: HomeScreenStack,
        navigationOptions: ({ navigation }) => {
          return{
              tabBarVisible: navigation.state.index === 0,
              tabBarIcon: ({tintColor}) => (
                <Icon name ="newspaper" color={tintColor} size ={24} />
              )
          }
        }
      },
      Store:{
        screen: StoreScreenStack,
        navigationOptions: ({ navigation }) => {
          return{
            tabBarVisible: navigation.state.index === 0,
            tabBarLable:'Store',
            header: null,
            tabBarIcon: ({tintColor}) => (
              <Iconnn name ="home" color={tintColor} size ={24} />
            )
          }
        }
      },
      Map:{
        screen: MapScreenStack,
        navigationOptions: ({ navigation }) => {
          return{
            tabBarVisible: navigation.state.index === 0,
            tabBarLable:'MapScreen',
            header: null,
            tabBarIcon: ({tintColor}) => (
              <Iconn name ="map-pin" color={tintColor} size ={24} />
            )
          }
        }
        
      },
      ProFile:{
        screen: ProfileScreenStack,
        navigationOptions: ({ navigation }) => {
          return{
            tabBarVisible: navigation.state.index === 0,
            tabBarLable:'ProFile',
            header: null,
            tabBarIcon: ({tintColor}) => (
              <Iconn name ="user" color={tintColor} size ={24} />
            )
          }
        }
        
      }
      

  },
  {
      order: ['Home','Store','Map','ProFile'],
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes
        [ navigation.state.index ];
        return {
          header:null,
          // headerTitle: routeName,
          headerStyle: {
             // Specify the height of your custom header

          },
          
        };
      },
      tabBarOptions:{
        activeTintColor: COLOR_HIGTHPERLINK,
        inactiveTintColor:'grey'
      }
  }
)

//////
const AppSwitchNavigator = createSwitchNavigator(
    {
        Slapscreen:SplashScreen,
        IntroScreen:IntroScreen,
        LoginScreen:LoginScreen,
        Dashboard: TabNavigator
    },
  {
    initialRouteName: 'Slapscreen',
  }
);
///////////////
const AppContainer = createAppContainer(AppSwitchNavigator); 
export default function App(){
    return <AppContainer/>;
}
// export default AppContainer;
