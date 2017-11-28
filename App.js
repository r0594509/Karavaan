import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {TabNavigator} from 'react-navigation'


export class ScreenA extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Uitgaven'
  };

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>Somthing</Text>
          <Button
            title='Uitgave Toevoegen'
            onPress={() => this.setModalVisible(true)}
            />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <Button 
              title='save'
              onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </Button>

          </View>
         </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export class ScreenB extends React.Component {
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


export default App = TabNavigator({
  TabA: {screen: ScreenA},
  TabB: {screen: ScreenB},
}, {
  tabBarPosition: 'top'
});
