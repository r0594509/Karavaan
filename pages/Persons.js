import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ScrollView, StyleSheet, Text, View, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator } from 'react-navigation'
import  styles  from '../styles/styles';
//global var c = controller instance
import c from '../domain/controller/Controller';

export class Persons extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Personen',
    tabBarIcon: () => <Image source={'./img/people_white.png'} />
  };

  render() {
    var textLoop = [];
    
    c.getPersonsInTrip(-1 /*debug value*/).forEach(element => {
      textLoop.push(
        // elk element in een lus heeft blijkbaar een ID nodig
          <TouchableHighlight onPress= {() => alert("clicked on " + element.name)} key = {element.id} style={{ borderRadius: 5, margin: 5, }}>
            <View style={styles.cardLayout}>
              <Text style={styles.titleText}>Name: {element.name}</Text>
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