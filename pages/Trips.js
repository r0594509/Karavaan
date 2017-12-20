import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Trip } from '../domain/model/Trip';
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
    formNameIsValid: true,
    formDescIsValid: true,
  }
 
  handleOnClose_newTripForm() {
    this.saveNewTrip();
  }

  saveNewTrip() {

    let name = this.state.tripName;
    let desc = this.state.tripDesc;
    let errors = 0;

    if (!Trip.isValidTripName(name)) {
      errors++;
      this.setState({ formNameIsValid: false})
    } else {
      this.setState({ formNameIsValid: true });
    }

    if (!Trip.isValidTropDescription(desc)) {
      errors++;
      this.setState({ formDescIsValid:false})
    } else {
      this.setState({ formDescIsValid: true });
    }

    if (errors === 0) {
      c.addTrip(new Trip(name, desc));
      this.toggleModalVisible();
    }
  }
  //Zet de modal visible
  toggleModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  //Functie om te navigeren naar individuele Trip pagina
  //Wordt later goToTrip(int id)
  goToTrip(id) {
    //name: string = c.getTrip(id).name;
    this.props.navigation.navigate('TripScreen', {id: id});
  }
 
  //Rendert het venster
  render() {
    var tripList = [];
    
    c.getTrips().forEach(element => {
      tripList.push(
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

    var formName = [];
    var formDesc = [];

    if (this.state.formNameIsValid) {
      formName.push(
        <Text key="formName" style={styles.FormText}>TRIP NAME</Text>
      )
    } else {
      formName.push(
        <Text key="formName" style={styles.FormTextInvalid}>TRIP NAME IS NOT VALID</Text>
      )
    }

    if (this.state.formDescIsValid) {
      formDesc.push(
        <Text key="formDesc" style={styles.FormText}>TRIP DESCRIPTION</Text>
      )
    } else {
      formDesc.push(
        <Text key="formDesc" style={styles.FormTextInvalid}>TRIP DESCRIPTION IS NOT VALID</Text>
      )
    }

    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
              {tripList}
          </ScrollView>

          {/* Knop voor het formulier te openen om een Trip toe te voegen */}
          <View>
            <TouchableHighlight onPress={() => this.toggleModalVisible()} style={styles.ButtonLayoutMain}>
              <View>
                <Text style={styles.ButtonText}>Add Trip</Text>
              </View>
            </TouchableHighlight>
          </View>

          <Modal animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed.") }} 
          >
            <View style={{ marginTop: 22, flex: 1 }}>
              {formName}
              <TextInput
                style={styles.FormInput}
                placeholder="The trip name should contain at least 5 characters"
                onChangeText={(tripName) => this.setState({ tripName })}
              />

              {formDesc}
              <TextInput
                style={styles.FormInput}
                placeholder="Please enter a description for your trip"
                onChangeText={(tripDesc) => this.setState({ tripDesc })}
              />

              <Text style={styles.FormText}>TRIP FRIENDS</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="example: 13_14_16"
                onChangeText={(tripPersons) => this.setState({ tripPersons })}
              />
            </View>
            <View>
                <TouchableHighlight onPress={() => this.handleOnClose_newTripForm()} style={styles.ButtonLayoutMain}>
                  <View>
                    <Text style={styles.ButtonText}>Save</Text>
                  </View>
                </TouchableHighlight>
              </View>
          </Modal>

        </View>
      </View>
    );
  }
}

