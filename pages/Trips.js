import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import {TabNavigator} from 'react-navigation'


export class Trips extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All Trips'
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