import React from 'react';
import { Text, View, ScrollView, TouchableHighlight, Modal, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import Popup from 'react-native-popup';
import { Trip } from '../domain/model/Trip';
import styles from '../styles/styles';
import { Currencies } from 'ts-money';
import { Dropdown } from 'react-native-material-dropdown';
import c from '../domain/controller/Controller';
export class Trips extends React.Component {
    constructor(props) {
        super(props);
        //Initiele Status van de modal (pop-up venster)
        this.state = {
            modalVisible: false,
            modalFriendsVisible: false,
            tripCurrency: null,
            currencyFormTitle: 'Select Currency',
            formNameIsValid: true,
            formDescIsValid: true,
            personIdList: [],
            personsInTripList: [],
            currencyList: [],
        };
    }
    handleOnSave_newTripForm() {
        this.saveNewTrip();
    }
    handleOnCancel_newTripForm() {
        this.toggleModalVisible();
        this.setState({ formNameIsValid: true });
        this.setState({ formDescIsValid: true });
        this.setState({ personIdList: [] });
        this.setState({ currencyList: [] });
        this.setState({ personsInTripList: [] });
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
        }
        else {
            this.setState({ tripCurrencyIsValid: true });
        }
        if (!Trip.isValidTripName(name)) {
            errors++;
            this.setState({ formNameIsValid: false });
        }
        else {
            this.setState({ formNameIsValid: true });
        }
        if (!Trip.isValidTropDescription(desc)) {
            errors++;
            this.setState({ formDescIsValid: false });
        }
        else {
            this.setState({ formDescIsValid: true });
        }
        if (errors === 0) {
            let trip = new Trip(name, desc, Currencies[currency], this.processCurrencyCode(this.state.currencyList), this.processPersonIds(this.state.personIdList));
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
    processCurrencyCode(currenciesList) {
        var tmp = [];
        currenciesList.forEach(element => {
            for (var n in Currencies) {
                if (Currencies[n].code == element.value) {
                    tmp.push(Currencies[n]);
                }
            }
        });
        return tmp;
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
            friendList.push(React.createElement(View, { key: person.id, style: [styles.FormViewExpensePerson, { backgroundColor: 'lightgrey' }] },
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(Text, { style: styles.FormText }, person.name)),
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(Text, { style: styles.FormText }, "50 EUR"))));
        });
        this.setState({ personsInTripList: friendList });
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
        }
        else {
            this.setState({
                personIdList: this.state.personIdList.splice(this.state.personIdList.indexOf(id) + 1, 1)
            });
        }
        //console.log(this.state.personIdList);
    }
    toggleSelectedCurrency(currency) {
        if (this.state.currencyList.indexOf(currency) === -1) {
            this.setState({
                currencyList: this.state.currencyList.concat([currency])
            });
        }
        else {
            this.setState({
                currencyList: this.state.currencyList.splice(this.state.currencyList.indexOf(currency) + 1, 1)
            });
        }
        //console.log(this.state.currencyList);
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
            React.createElement(TouchableHighlight, { key: element.id, style: { borderRadius: 5, margin: 5, }, onPress: () => this.goToTrip(element.id), onLongPress: () => this.removeItem(element.id) },
                React.createElement(View, { style: styles.cardLayout },
                    React.createElement(Text, { style: styles.titleText },
                        "Name: ",
                        element.name),
                    React.createElement(Text, null,
                        "Description: ",
                        element.description))));
        });
        c.getPersons().forEach(element => {
            personList.push(React.createElement(CheckBox, { key: element.id, leftText: element.name, 
                //checked={this.state.checked}
                onClick: () => this.toggleSelectedPerson(element.id), isChecked: false, style: styles.FormCheckBoxInput }));
        });
        currenciesList.forEach(element => {
            extraCurrencies.push(React.createElement(CheckBox, { key: element.value, leftText: element.value, 
                //checked={this.state.checked}
                onClick: () => this.toggleSelectedCurrency(element), isChecked: false, style: styles.FormCheckBoxInput }));
        });
        var formName = [];
        var formDesc = [];
        var currencyFormDropDown = [];
        if (this.state.formNameIsValid) {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormText }, "TRIP NAME"));
        }
        else {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormTextInvalid }, "TRIP NAME IS NOT VALID"));
        }
        if (this.state.formDescIsValid) {
            formDesc.push(React.createElement(Text, { key: "formDesc", style: styles.FormText }, "TRIP DESCRIPTION"));
        }
        else {
            formDesc.push(React.createElement(Text, { key: "formDesc", style: styles.FormTextInvalid }, "TRIP DESCRIPTION IS NOT VALID"));
        }
        if (this.state.tripCurrencyIsValid) {
            currencyFormDropDown.push(React.createElement(Dropdown, { key: "currencydormdropdown", label: this.state.currencyFormTitle, data: currenciesList, onChangeText: (tripCurrency) => this.setState({ tripCurrency: tripCurrency }), 
                //fontSize={16}
                containerStyle: { paddingRight: 15 }, baseColor: 'black', dropdownPosition: 1 }));
        }
        else {
            currencyFormDropDown.push(React.createElement(Dropdown, { key: "currencydormdropdown", label: this.state.currencyFormTitle, data: currenciesList, onChangeText: (tripCurrency) => this.setState({ tripCurrency: tripCurrency }), 
                //fontSize={16}
                containerStyle: { paddingRight: 15 }, baseColor: 'red', dropdownPosition: 1 }));
        }
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, tripList),
                React.createElement(View, null,
                    React.createElement(TouchableHighlight, { onPress: () => this.handleOnCancel_newTripForm(), style: styles.ButtonLayoutMain },
                        React.createElement(View, null,
                            React.createElement(Text, { style: styles.ButtonText }, "Add Trip")))),
                React.createElement(Modal, { animationType: "slide", transparent: false, visible: this.state.modalVisible, onRequestClose: () => this.toggleModalVisible() },
                    React.createElement(View, { style: { marginTop: 22, flex: 1 } },
                        formName,
                        React.createElement(TextInput, { style: styles.FormInput, placeholder: "The trip name should contain at least 5 characters", onChangeText: (tripName) => this.setState({ tripName }) }),
                        formDesc,
                        React.createElement(TextInput, { style: styles.FormInput, placeholder: "Please enter a description for your trip", onChangeText: (tripDesc) => this.setState({ tripDesc }) }),
                        React.createElement(View, { style: { width: 400, marginLeft: 8 } }, currencyFormDropDown),
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(Text, { style: styles.FormText }, "EXTRA CURRENCIES"),
                            React.createElement(ScrollView, { style: { flex: 1 }, contentContainer: { paddingVertical: 20 } }, extraCurrencies),
                            React.createElement(Text, { style: styles.FormText }, "TRIP FRIENDS"),
                            React.createElement(ScrollView, { style: { flex: 1 }, contentContainer: { paddingVertical: 20 } }, personList))),
                    React.createElement(View, null,
                        React.createElement(TouchableHighlight, { onPress: () => this.handleOnSave_newTripForm(), style: styles.ButtonLayoutMain },
                            React.createElement(View, null,
                                React.createElement(Text, { style: styles.ButtonText }, "Save"))))),
                React.createElement(Modal, { animationType: "fade", transparent: true, visible: this.state.modalFriendsVisible, onRequestClose: () => this.closeModalFriends() },
                    React.createElement(View, { style: styles.ModalFriends },
                        React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, this.state.personsInTripList),
                        React.createElement(TouchableHighlight, { onPress: () => this.closeModalFriends(), style: styles.ButtonLayoutMain },
                            React.createElement(View, null,
                                React.createElement(Text, { style: styles.ButtonText }, "Close"))))),
                React.createElement(Popup, { ref: popup => this.popup = popup }))));
    }
}
// Zet de title van de TabBar
Trips.navigationOptions = {
    tabBarLabel: 'My Trips',
};
//# sourceMappingURL=Trips.js.map