import React from 'react';
import { Text, View, ScrollView, TouchableHighlight, Modal, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Popup from 'react-native-popup';
import { Person } from '../domain/model/Person';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
export class Persons extends React.Component {
    constructor() {
        super(...arguments);
        //Initiele Status van de modal (pop-up venster)
        this.state = {
            modalVisible: false,
            formNameIsValid: true,
            formDescIsValid: true,
            tripSelected: "ALL",
            tripsDDTitle: "Sort contacts by trips",
        };
    }
    goToPersonSummary(id, filter) {
        this.props.navigation.navigate('PersonSummaryScreen', { id: id, filter: filter });
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
            this.setState({ formNameIsValid: false });
        }
        else {
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
        var dropDownData = [];
        dropDownData.push({ value: "ALL" });
        c.getTrips().forEach(element => {
            dropDownData.push({ value: element.name });
        });
        var personList = [];
        c.getPersons(this.state.tripSelected === "ALL" ? null : this.state.tripSelected).forEach(element => {
            let owedAmount = Math.round(c.getPersonBalance(element.id, this.state.tripSelected)[0] * 100) / 100;
            personList.push(
            // elk element in een lus heeft blijkbaar een ID nodig
            React.createElement(TouchableHighlight, { onPress: () => this.goToPersonSummary(element.id, this.state.tripSelected), onLongPress: () => this.removeItem(element.id), key: element.id, style: { borderRadius: 5, margin: 5, } },
                React.createElement(View, { style: styles.cardLayoutMini },
                    React.createElement(Text, { style: styles.titleText }, element.name))));
        });
        //<Text style={{ color: 'green' }}>Amount lend: {Math.round(c.getPersonBalance(element.id, this.state.tripSelected)[1] * 100) / 100}</Text>
        var formName = [];
        if (this.state.formNameIsValid) {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormText }, "CONTACT NAME"));
        }
        else {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormTextInvalid }, "CONTACT NAME IS NOT VALID"));
        }
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(Dropdown, { label: this.state.tripsDDTitle, data: dropDownData, onChangeText: (tripSelected) => this.setState({ tripSelected: tripSelected }), fontSize: 20, containerStyle: { paddingLeft: 15, paddingRight: 15 }, baseColor: 'rgba(0, 0, 0, 1)', dropdownPosition: 1 }),
                React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, personList),
                React.createElement(View, null,
                    React.createElement(TouchableHighlight, { onPress: () => this.handleOnCancel_newPersonForm(), style: styles.ButtonLayoutMain },
                        React.createElement(View, null,
                            React.createElement(Text, { style: styles.ButtonText }, "Add Contact")))),
                React.createElement(Modal, { animationType: "slide", transparent: false, visible: this.state.modalVisible, onRequestClose: () => this.toggleModalVisible() },
                    React.createElement(View, { style: { marginTop: 22, flex: 1 } },
                        formName,
                        React.createElement(TextInput, { style: styles.FormInput, placeholder: "Type the contacts name here", onChangeText: (personName) => this.setState({ personName }) })),
                    React.createElement(View, null,
                        React.createElement(TouchableHighlight, { onPress: () => this.handleOnSave_newPersonForm(), style: styles.ButtonLayoutMain },
                            React.createElement(View, null,
                                React.createElement(Text, { style: styles.ButtonText }, "Save"))))),
                React.createElement(Popup, { ref: popup => this.popup = popup }))));
    }
}
Persons.navigationOptions = {
    tabBarLabel: 'Contacts',
};
//# sourceMappingURL=Persons.js.map