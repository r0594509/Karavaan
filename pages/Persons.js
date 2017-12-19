import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ScrollView, StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { Controller } from './../domain/controller/Controller';

export class Persons extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />
  };

  constructor(props) {
    super(props);

    // Access controller like so
    // this.props.c
  }


  render() {
    var textLoop = [];
    
    this.props.c.getPersonsInTrip(-1 /*debug value*/).forEach(element => {
      textLoop.push(
        // elk element in een lus heeft blijkbaar een ID nodig
          <TouchableHighlight onPress= {() => alert("clicked on " + element.name)} key = {element.id} /* Do not forget to add a key */>
            <View style={{ flexDirection: "row", height: 100, padding: 20, backgroundColor: "lightgrey"}}>
              <Text>Name: {element.name}</Text>
            </View>
          </TouchableHighlight>
      )
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