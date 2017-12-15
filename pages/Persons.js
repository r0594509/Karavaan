import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ScrollView, StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { ControllerClass, Controller } from './../domain/controller/Controller';

export class Persons extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />
  };

  render() {

    var ctrl = new Controller();
    var textLoop = [];
    var i = 1;

    ctrl.getPersonsInTrip(-1 /*debug value*/).forEach(element => {
      textLoop.push(
          <TouchableHighlight onPress= {() => alert("clicked")} key = {i} /* Do not forget to add a key */>
            <View style={{ flexDirection: "row", height: 100, padding: 20, backgroundColor: "lightgrey"}}>
              <Text>{i} + {element.name} + {element.id}</Text>
            </View>
          </TouchableHighlight>
      )
      i++;
    });

    return (
      <View style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <Text>Contents of screen B</Text>
        <Button
          title="Personen Toevoegen"
          onPress={() => this.onPress()}
        />
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
            {textLoop}
          </ScrollView>
      </View>
    );
  }
}

/*
<ScrollView contentContainer={{ paddingVertical: 20 }}>
            <TouchableHighlight onPress= {() => alert("clicked")}>
            <View style={{ flexDirection: "row", height: 100, padding: 20, backgroundColor: "lightgrey"}}>
              <Text>IDK</Text>
            </View>
          </TouchableHighlight>
          </ScrollView>
style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}

*/