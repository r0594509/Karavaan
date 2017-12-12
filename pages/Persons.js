import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'

export class Persons extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />,
  };

  render() {
    return (
      <View style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <Text>Contents of screen B</Text>
        <Button
          title="Personen Toevoegen"
          onPress={() => this.onPress()}
        />
      </View>
    );
  }
}

//style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}