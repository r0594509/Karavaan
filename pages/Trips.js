import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import CheckBox from 'react-native-check-box';
import Popup from 'react-native-popup';
import { Trip } from '../domain/model/Trip';
import styles from '../styles/styles';
import { Money, Currencies, Currency } from 'ts-money';
import { Dropdown } from 'react-native-material-dropdown';
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
    modalFriendsVisible: false,
    tripCurrency: null,
    currencyFormTitle: 'Select Currency',
    formNameIsValid: true,
    formDescIsValid: true,
    personIdList: [],
    personsInTripList: [],
  }

  handleOnSave_newTripForm() {
    this.saveNewTrip();
  }

  handleOnCancel_newTripForm() {
    this.toggleModalVisible();
    this.setState({ formNameIsValid: true });
    this.setState({ formDescIsValid: true });
    this.setState({ personIdList: [] });
    this.setState({ tripCurrencyIsValid: true });
    this.state.tripName = null;
    this.state.tripDesc = null;
    this.state.tripCurrency = null;
  }

  saveNewTrip() {
    let name = this.state.tripName;
    let desc = this.state.tripDesc;
    let currency = this.state.tripCurrency;
    let errors = 0;

    if (currency == null) {
      errors++;
      this.setState({ tripCurrencyIsValid: false });
    } else {
      this.setState({ tripCurrencyIsValid: true });
    }

    if (!Trip.isValidTripName(name)) {
      errors++;
      this.setState({ formNameIsValid: false })
    } else {
      this.setState({ formNameIsValid: true });
    }

    if (!Trip.isValidTropDescription(desc)) {
      errors++;
      this.setState({ formDescIsValid: false })
    } else {
      this.setState({ formDescIsValid: true });
    }

    if (errors === 0) {
      let trip = new Trip(name, desc, Currencies[currency], this.processPersonIds(this.state.personIdList));
      //console.log(trip);
      c.addTrip(trip);
      this.toggleModalVisible();
      // clear state for next form
      this.state.tripName = null;
      this.state.tripDesc = null;
      this.state.tripCurrency = null;
      this.state.personIdList = [];
    }
  }

  processPersonIds(personIds) {
    var personList = [];
    personIds.forEach(element => {
      personList.push(c.getPerson(element));
    });
    return personList;
  }

  //Zet de modal visible
  toggleModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  removeItem(id) {
    this.popup.confirm({
      title: 'Remove',
      content: ['Do you want to remove,', 'Expense: ' + c.getTrip(id).name],
      ok: {
        text: 'Yes',
        style: {
          color: 'red'
        },
        callback: () => {
          this.popup.alert(c.getTrip(id).name + ' has been removed!');
          c.removeTrip(id);
          this.forceUpdate();
        },
      },
      cancel: {
        text: 'No',
        style: {
          color: 'black'
        },
        callback: () => {
          this.popup.alert(c.getTrip(id).name + ' has not been removed.');
        },
      },
    });
  }

  /** @Obsolete */
  closeModalFriends() {
    this.setState({ modalFriendsVisible: !this.state.modalFriendsVisible });
  }

  /** @Obsolete */
  openModalFriends(id) {
    friendList = [];
    c.getTrip(id).persons.forEach(person => {
      friendList.push(
        <View key={person.id} style={[styles.FormViewExpensePerson, { backgroundColor: 'lightgrey' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.FormText}>{person.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.FormText}>50 EUR</Text>
          </View>
        </View>
      )
    });
    this.setState({ personsInTripList: friendList })
    this.setState({ modalFriendsVisible: !this.state.modalFriendsVisible });
  }

  //Functie om te navigeren naar individuele Trip pagina
  //Wordt later goToTrip(int id)
  goToTrip(id) {
    //name: string = c.getTrip(id).name;
    this.props.navigation.navigate('TripScreen', { id: id });
  }

  toggleSelectedPerson(id) {
    if (this.state.personIdList.indexOf(id) === -1) {
      this.setState({
        personIdList: this.state.personIdList.concat([id])
      });
    } else {
      this.setState({
        personIdList: this.state.personIdList.splice(this.state.personIdList.indexOf(id) + 1, 1)
      });
    }
  }

  toggleSelectedCurrency(currency){
    //TODO
  }
  //Rendert het venster
  render() {

    let currenciesList = c.getTenMostPopularCurrencies();
  
    var tripList = [];
    var personList = [];
    var extraCurrencies = [];

    c.getTrips().forEach(element => {
      tripList.push(
        // Zijn de CARDS waarop gedrukt kan worden om venster te openen
        <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToTrip(element.id)} onLongPress={() => this.removeItem(element.id)}>
          <View style={styles.cardLayout}>
            <Text style={styles.titleText}>Name: {element.name}</Text>
            <Text>Description: {element.description}</Text>
          </View>
        </TouchableHighlight>
      )
    });

    c.getPersons().forEach(element => {
      personList.push(
        <CheckBox
          key={element.id}
          leftText={element.name}
          //checked={this.state.checked}
          onClick={() => this.toggleSelectedPerson(element.id)}
          isChecked={false}
          style={styles.FormCheckBoxInput}
        />
      )
    });
    
    currenciesList.forEach(element => {
      extraCurrencies.push(
        <CheckBox
          key={element.value}
          leftText={element.value}
          //checked={this.state.checked}
          onClick={() => this.toggleSelectedCurrency(element.value)}
          isChecked={false}
          style={styles.FormCheckBoxInput}
        />
      )
    });

    var formName = [];
    var formDesc = [];
    var currencyFormDropDown = [];

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

    if (this.state.tripCurrencyIsValid) {
      currencyFormDropDown.push(
        <Dropdown
          key="currencydormdropdown"
          label={this.state.currencyFormTitle}
          data={currenciesList}
          onChangeText={(tripCurrency) => this.setState({ tripCurrency: tripCurrency })}
          //fontSize={16}
          containerStyle={{ paddingRight: 15 }}
          baseColor='black'
          dropdownPosition={1}
        />
      );
    } else {
      currencyFormDropDown.push(
        <Dropdown
          key="currencydormdropdown"
          label={this.state.currencyFormTitle}
          data={currenciesList}
          onChangeText={(tripCurrency) => this.setState({ tripCurrency: tripCurrency })}
          //fontSize={16}
          containerStyle={{ paddingRight: 15 }}
          baseColor='red'
          dropdownPosition={1}
        />
      );
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
            <TouchableHighlight onPress={() => this.handleOnCancel_newTripForm()} style={styles.ButtonLayoutMain}>
              <View>
                <Text style={styles.ButtonText}>Add Trip</Text>
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
                placeholder="The trip name should contain at least 5 characters"
                onChangeText={(tripName) => this.setState({ tripName })}
              />

              {formDesc}
              <TextInput
                style={styles.FormInput}
                placeholder="Please enter a description for your trip"
                onChangeText={(tripDesc) => this.setState({ tripDesc })}
              />

              <View style={{ width: 200, marginLeft: 8 }}>
                {currencyFormDropDown}
              </View>
              <Text style={styles.FormText}>EXTRA CURRENCIES</Text>

              <ScrollView contentContainer={{ paddingVertical: 20 }}>
                {extraCurrencies}
              </ScrollView>

              <Text style={styles.FormText}>TRIP FRIENDS</Text>

              <ScrollView contentContainer={{ paddingVertical: 20 }}>
                {personList}
              </ScrollView>
            </View>
            <View>
              <TouchableHighlight onPress={() => this.handleOnSave_newTripForm()} style={styles.ButtonLayoutMain}>
                <View>
                  <Text style={styles.ButtonText}>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>

          {/* Friends Modal */}

          <Modal animationType="fade"
            transparent={true}
            visible={this.state.modalFriendsVisible}
            onRequestClose={() => this.closeModalFriends()}
          >
            <View style={styles.ModalFriends}>
              <ScrollView contentContainer={{ paddingVertical: 20 }}>
                {this.state.personsInTripList}
              </ScrollView>
              <TouchableHighlight onPress={() => this.closeModalFriends()} style={styles.ButtonLayoutMain}>
                <View>
                  <Text style={styles.ButtonText}>Close</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>

          {/** Popup component */}
          <Popup ref={popup => this.popup = popup} />
          {/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}

        </View>
      </View >
    );
  }
}

