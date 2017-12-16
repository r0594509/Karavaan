import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Persons } from './pages/Persons';
import { Trips } from './pages/Trips';
import { Trip } from './pages/Trip';
import { Controller } from './domain/controller/Controller';

export default class App extends React.Component {
  render() {
    return <MainNavigation />;
  }
}
const MainNavigation = TabNavigator({
  TabA: {screen: Trips},
  TabB: {screen: props => <Persons c={new Controller()} />},
}, {
  tabBarPosition: 'bottom'
});

const stackNavigatorTrip = StackNavigator ({
  Home: { screen: MainNavigation },
  Trip: { screen: Trip },
});

