import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import  styles  from '../styles/styles';
//global var c = controller instance
import c from '../domain/controller/Controller';

export class Trips extends React.Component {

  // Zet de title van de TabBar
  static navigationOptions = {
    tabBarLabel: 'My Trips',
  };

  constructor(props) {
    super(props);
  }

  //Initiele Status van de modal (pop-up venster)
  state = {
    modalVisible: false,
  }
 
  //Zet de modal visible
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //Functie om te navigeren naar individuele Trip pagina
  //Wordt later goToTrip(int id)
  goToTrip(id) {
    //name: string = c.getTrip(id).name;
    this.props.navigation.navigate('TripScreen', {id: id});
  }
 
  //Rendert het venster
  render() {
    var textLoop = [];
    
    c.getTrips().forEach(element => {
      textLoop.push(
        // Zijn de CARDS waarop gedrukt kan worden om venster te openen
        // N: iterations need a unique key
        <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToTrip(element.id)}>
        <View style={styles.cardLayout}>
          <Text style={styles.titleText}>Name: {element.name}</Text>
          <Text>Description: {element.description}
          </Text>
        </View>
      </TouchableHighlight>
      )
    });

    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
              {textLoop}
          </ScrollView>

          {/* Knop voor het formulier te openen om een Trip toe te voegen */}
          <View>
            <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.ButtonLayoutMain}>
              <View>
                <Text style={styles.ButtonText}>Add Trip</Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* Formulier Venster voor een Trip aan te maken 
          Toekomst te steken in een aparte .js file
          */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed.") }}
          >
            {/* Formulier inhoud */}
            <View style={{ marginTop: 22, flex: 1 }}>

              <Text style={styles.FormText}>TRIP NAME</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the trip name here!"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>TRIP DESCRIPTION</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the trip description here"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>TRIP FRIENDS</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="example: 13_14_16"
                onChangeText={(text) => this.setState({ text })}
              />

              <View>

                <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.ButtonLayoutMain}>
                  <View>
                    <Text style={styles.ButtonText}>Save</Text>
                  </View>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>

        </View>
      </View>
    );
  }
}

