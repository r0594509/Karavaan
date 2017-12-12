import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ScrollView, StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { ControllerClass } from './../domain/controller/Controller';

export class Persons extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />
  };

  render() {
    return (
      <View style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <Text>Contents of screen B</Text>
        <Button
          title="Personen Toevoegen"
          onPress={() => this.onPress()}
        />
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
            <TouchableHighlight onPress= {() => alert("clicked")}>
              <View style={{ flexDirection: "row", height: 100, padding: 20, backgroundColor: "lightgrey"}}>
                <Text>Somthing</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>

      </View>
    );
  }
}

//style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}