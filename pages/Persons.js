import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput, Picker } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Popup from 'react-native-popup';
import { Person } from '../domain/model/Person';
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
    tripSelected: "ALL",
    tripsDDTitle: "Sort contacts by trips", //tripsDropDownTitle
  }

  removeItem(id) {
    this.popup.confirm({
      title: 'Remove',
      content: ['Do you want to remove,', 'Person: ' + c.getPerson(id).name],
      ok: {
        text: 'Yes',
        style: {
          color: 'red'
        },
        callback: () => {
          this.popup.alert(c.getPerson(id).name + ' has been removed!');
          c.removePerson(id);
          // force a view update by calling setState method
          this.setState({ update: true });
        },
      },
      cancel: {
        text: 'No',
        style: {
          color: 'black'
        },
        callback: () => {
          this.popup.alert(c.getPerson(id).name + 'has not been removed.');
        },
      },
    });
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
    this.state.personName = null;
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

    console.log(this.state.tripSelected);

    var dropDownData = [];

    dropDownData.push({value: "ALL"});
    c.getTrips().forEach(element => {
      dropDownData.push({value: element.name});
    });

    var personList = [];

    c.getPersons(this.state.tripSelected==="ALL"? null : this.state.tripSelected).forEach(element => {
      personList.push(
        // elk element in een lus heeft blijkbaar een ID nodig
        <TouchableHighlight onPress={() => alert("clicked on " + element.name)} onLongPress={() => this.removeItem(element.id)} key={element.id} style={{ borderRadius: 5, margin: 5, }}>
          <View style={styles.cardLayout}>
            <Text style={styles.titleText}>{element.name}</Text>
            <Text style={{ color: 'red' }}>Amount owed: {c.getPersonBalance(element.id, this.state.tripSelected)[0]}</Text>
            <Text style={{ color: 'green' }}>Amount lend: {c.getPersonBalance(element.id, this.state.tripSelected)[1]}</Text>
          </View>
        </TouchableHighlight>
      )
    });

    var formName = [];

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

          <Dropdown
            label={this.state.tripsDDTitle}
            data={dropDownData}
            onChangeText={(tripSelected) => this.setState({ tripSelected: tripSelected })}
            fontSize={20}
            containerStyle={{ paddingLeft: 15, paddingRight: 15 }}
            baseColor='rgba(0, 0, 0, 1)'
            dropdownPosition={1}
          />

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
                onChangeText={(personName) => this.setState({ personName })}
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

          {/** Popup component */}
          <Popup ref={popup => this.popup = popup} />
          {/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}

        </View>
      </View>
    );
  }
}