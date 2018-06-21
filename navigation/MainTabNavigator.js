import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PrizesScreen from '../screens/PrizesScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import MenuScreen from '../screens/MenuScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PrizeStack = createStackNavigator({
  Links: PrizesScreen,
});

PrizeStack.navigationOptions = {
  tabBarLabel: 'Prämien',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const ChallengesStack = createStackNavigator({
  Settings: ChallengesScreen,
});

ChallengesStack.navigationOptions = {
  tabBarLabel: 'Challenges',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const MenuStack = createStackNavigator({
  Settings: MenuScreen,
});

MenuStack.navigationOptions = {
  tabBarLabel: 'Mehr',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  PrizeStack,
  ChallengesStack,
  MenuStack
});
