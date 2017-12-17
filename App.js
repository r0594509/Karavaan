import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Persons } from './pages/Persons';
import { Trips } from './pages/Trips';
import { Trip } from './pages/Trip';
import { Controller } from './domain/controller/Controller';

//Start Punt van de App
//PLEAS DO NOT TOUCH!
export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return <View style={{ flex: 1 }}>
      {/* Werkt voorlopig niet, tracht de transparantie van de Status Bar weg te krijgen */}
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      {/* Wordt als eerste ingeladen */}
      <StackNavigation />
    </View>;
  }
}

App.defaultProps = {
  controller: new Controller()
}

//Maakt de TabBar navigatie onderaan 
const MainNavigation = TabNavigator({
  //TabA: { screen: () => <Trips c={App.defaultProps.controller} />}, <-- fuckt de navigatie
  TabA: { screen: Trips},
  TabB: { screen: twoplustwoisfourminusoneisthreequitmaths => <Persons c={App.defaultProps.controller} />},
  // I can type wathever here for some reason??
  //                      |
  //                      v
  //TabB: { screen:    wwdwdws   => <Persons c={ this.state } /> },
}, {
    tabBarPosition: 'bottom'
});

//Maakt navigatie mogelijk tussen CARDs en Inhoud
const StackNavigation = StackNavigator({
  Home: {
    //TabBar navigation => Parant of StackNavigation
    screen: MainNavigation,
    navigationOptions: {
      //Title bovenaan
      //Voorlopig Static
      title: 'Vacation Planner',
    },
  },
  //Inhouds Pagina TRIP
  TripScreen: { screen: Trip },
  //TripScreen: {screen: Person },
});