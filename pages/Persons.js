import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation'
import styles from '../styles/styles';
//global var c = controller instance
import c from '../domain/controller/Controller';

export class Persons extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Contacts',
  };

  //Initiele Status van de modal (pop-up venster)
  state = {
    modalVisible: false,
    formNameIsValid: true,
    formDescIsValid: true,
  }

  toggleModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  handleOnSave_newPersonForm() {
    this.saveNewPerson();
  }

  handleOnCancel_newPersonForm() {
    this.toggleModalVisible();
    this.setState({ formNameIsValid: true });
  }

  saveNewPerson() {

    let name = this.state.personName;
    let errors = 0;

    if (!Person.isValidPersonName(name)) {
      errors++;
      this.setState({ formNameIsValid: false })
    } else {
      this.setState({ formNameIsValid: true });
    }

    if (errors === 0) {
      c.addPerson(new Person(name));
      this.toggleModalVisible();
      // clear state for next form
      this.state.personName = null;
    }
  }

  render() {
    var personList = [];

    c.getPersonsInTrip(-1 /*debug value*/).forEach(element => {
      personList.push(
        // elk element in een lus heeft blijkbaar een ID nodig
        <TouchableHighlight onPress={() => alert("clicked on " + element.name)} key={element.id} style={{ borderRadius: 5, margin: 5, }}>
          <View style={styles.cardLayout}>
            <Text style={styles.titleText}>Name: {element.name}</Text>
          </View>
        </TouchableHighlight>
      )
    });

    var formName = [];
    var formDesc = [];

    if (this.state.formNameIsValid) {
      formName.push(
        <Text key="formName" style={styles.FormText}>CONTACT NAME</Text>
      )
    } else {
      formName.push(
        <Text key="formName" style={styles.FormTextInvalid}>CONTACT NAME IS NOT VALID</Text>
      )
    }

    return (
      <View style={styles.mainViewLayout} >
        <View style={{ flex: 1 }}>

          <ScrollView contentContainer={{ paddingVertical: 20 }}>
            {personList}
          </ScrollView>

          <View>
            <TouchableHighlight onPress={() => this.handleOnCancel_newPersonForm()} style={styles.ButtonLayoutMain}>
              <View>
                <Text style={styles.ButtonText}>Add Contact</Text>
              </View>
            </TouchableHighlight>
          </View>

          <Modal animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => this.toggleModalVisible()}
          >
            <View style={{ marginTop: 22, flex: 1 }}>
              {formName}
              <TextInput
                style={styles.FormInput}
                placeholder="Type the contacts name here"
                onChangeText={(contactName) => this.setState({ contactName })}
              />

            </View>
            <View>
              <TouchableHighlight onPress={() => this.handleOnSave_newPersonForm()} style={styles.ButtonLayoutMain}>
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