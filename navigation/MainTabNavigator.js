import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StopwatchScreen from '../screens/StopwatchScreen';
import TimerScreen from '../screens/TimerScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
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

HomeStack.path = '';

const StopwatchStack = createStackNavigator(
  {
    Stopwatch: StopwatchScreen,
  },
  config
);

StopwatchStack.navigationOptions = {
  tabBarLabel: 'Stopwatch',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-timer' : 'md-timer'} />
  ),
};

StopwatchStack.path = '';

const TimerStack = createStackNavigator(
  {
    Timer: TimerScreen,
  },
  config
);

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-alarm' : 'md-alarm'} />
  ),
};

TimerStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  StopwatchStack,
  TimerStack,
});

tabNavigator.path = '';

export default tabNavigator;
