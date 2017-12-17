import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

export class Trips extends React.Component {

  // Zet de title van de TabBar
  static navigationOptions = {
    tabBarLabel: 'My Trips',
  };

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
  goToTrip() {
    this.props.navigation.navigate('TripScreen', { user: 'Lucy' });
  }

  //Rendert het venster
  render() {
    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>

            {/* Zijn de CARDS waarop gedrukt kan worden om venster te openen */}
            <TouchableHighlight style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToTrip()}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfTrip</Text>
                <Text>DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip
                DescriptionOfTrip DescriptionOfTrip.
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ borderRadius: 5, margin: 5, }} onPress={() => alert("clicked")}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfTrip</Text>
                <Text>DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip
                DescriptionOfTrip DescriptionOfTrip.
                </Text>
              </View>
            </TouchableHighlight>

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

  //Alle Styles voor CARDS, Buttons, Text ...
  //Lijkt op CSS
  //Toekomst in een aparte file
  constru = styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',

    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardLayout: {
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: 'black',
      flexDirection: "column",
      height: 100,
      padding: 20,
      margin: 5,
      backgroundColor: "white",

    },
    mainViewLayout: {
      flex: 1,
      backgroundColor: "lightgrey"

    },

    ButtonLayoutMain: {
      borderRadius: 5,
      margin: 10,
      padding: 6,
      backgroundColor: "#1B94F1",
    },

    ButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "white",
    },

    FormText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "black",
      margin: 10,
    },

    FormInput: {
      fontSize: 15,
      marginLeft: 10,
      marginRight: 10,
      height: 40,
    },

  });
}
