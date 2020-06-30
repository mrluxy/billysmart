import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import StatsScreen from '../screens/StatsScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

/*------------------------  HomeStack ------------------------*/
const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  config
);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Image source={focused ?
      require('./images/home-selected.png') :
      require('./images/home.png')}
      style={{width: 40, height: 40}}
    />
  ),
};
HomeStack.path = '';

/*------------------------  ConfigStack ------------------------*/
const ConfigStack = createStackNavigator(
  { Config: ConfigScreen },
  config
);
ConfigStack.navigationOptions = {
  tabBarLabel: 'Config',
  tabBarIcon: ({ focused }) => (
    <Image source={focused ?
      require('./images/settings-selected.png') :
      require('./images/settings.png')}
      style={{width: 40, height: 40}}
    />
  ),
};
ConfigStack.path = '';

/*------------------------  StatsStack ------------------------*/
const StatsStack = createStackNavigator(
  { Stats: StatsScreen },
  config
);
StatsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <Image source={focused ?
      require('./images/config-selected.png') :
      require('./images/config.png')}
      style={{width: 40, height: 40}}
    />
  ),
};
StatsStack.path = '';

const TabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: 'transparent',
      marginHorizontal: 50,
      position: 'absolute',
      bottom: 0,
      borderTopWidth: 0
    }
  },
  initialRouteName: "HomeStack"
}
const tabNavigator = createBottomTabNavigator({
  ConfigStack,
  HomeStack,
  StatsStack,
}, TabNavigatorConfig);
tabNavigator.path = '';

export default tabNavigator;
