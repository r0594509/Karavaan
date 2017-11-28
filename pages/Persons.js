import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import {TabNavigator} from 'react-navigation'

export class Persons extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Personen',
    };
  
    render() {
      return (
        <View style={{flex: 1}}>
          <Text>Contents of screen B</Text>
          <Button
              title="Personen Toevoegen"
              onPress={() => this.onPress()}
              />
        </View>
      );
    }
  }