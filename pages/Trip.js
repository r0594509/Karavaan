import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class Trip extends React.Component {
    static navigationOptions = {
      title: 'Trip',
    };
  
    render() {
      const { goBack } = this.props.navigation;
      return (
        <View style={{flex: 1}}>
          <Text>Contents of trip</Text>
          <Button
          title="Go back"
          onPress={() => goBack()}
          />
        </View>
      );
    }
  }