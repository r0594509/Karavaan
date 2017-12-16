import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ScrollView, StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { Controller } from './../domain/controller/Controller';

export class Persons extends React.Component {
  
  controller: Controller;

  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />
  };

  constructor(/*this is not typescript...Controller*/ c) {
    super();

    // kan dees niet gebruiken in de loop for some reason ..........
    this.controller = c;
  }

  render() {
    // w/ gebruikt in de render()
    var textLoop = [];

    var tmp = new Controller();

    //console.log(tmp);
    // elk element in een lus heeft blijkbaar een ID nodig
    var i = 1;

    tmp.getPersonsInTrip(-1 /*debug value*/).forEach(element => {
      textLoop.push(
          <TouchableHighlight onPress= {() => alert("clicked on")} key = {i} /* Do not forget to add a key */>
            <View style={{ flexDirection: "row", height: 100, padding: 20, backgroundColor: "lightgrey"}}>
              <Text>Name: {element.name}, Id: {element.id}</Text>
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