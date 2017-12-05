import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { Persons } from './pages/Persons';
import { Trips } from './pages/Trips';

export default App = TabNavigator({
  TabA: {screen: Trips},
  TabB: {screen: Persons},
}, {
  tabBarPosition: 'bottom'
});
