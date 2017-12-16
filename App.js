import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { Persons } from './pages/Persons';
import { Trips } from './pages/Trips';
import { Controller } from './domain/controller/Controller';

export default App = TabNavigator({
  TabA: {screen: Trips},
  TabB: {screen: props => <Persons c={new Controller()} />},
}, {
  tabBarPosition: 'bottom'
});
