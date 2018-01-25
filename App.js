import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Persons } from './pages/Persons';
import { Trips } from './pages/Trips';
import { Trip } from './pages/Trip';
import { Expense } from './pages/Expense';
import { Controller } from './domain/controller/Controller';
import { PersonSummary } from './pages/PersonSummary';

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

//Maakt de TabBar navigatie onderaan 
const MainNavigation = TabNavigator({
  TabA: { screen: Trips },
  TabB: { screen: Persons },
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
      title: 'Karavaan expense manager',
    },
  },
  //Inhouds Pagina TRIP
  TripScreen: { screen: Trip },
  ExpenseScreen: { screen: Expense },
  PersonSummaryScreen: {screen: PersonSummary },
  },
  {
  cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
},
{ headerMode: 'screen' });