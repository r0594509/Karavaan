import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class Trip extends React.Component {
    static navigationOptions = {
      title: 'Trip',
    };
  
    render() {
      return (
        <View style={{flex: 1}}>
          <Text>Contents of trip</Text>
        </View>
      );
    }
  }