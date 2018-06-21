import React from 'react';
import { Modal, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import c from '../domain/controller/Controller';
import { Button } from '../components/Button';
import { FullTextInput as TextInput } from '../components/FullTextInput';
import { CheckList } from '../components/CheckList';
export class TripForm extends React.Component {
    constructor(props) {
        super(props);
        this.currenciesList = [];
        this.state = {
            tripName: '',
            tripDesc: '',
            tripCurrency: '',
        };
        this.currenciesList = c.getTenMostPopularCurrencies();
        this.onChangeText = this.onChangeText.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
        this.onClickCheckList = this.onClickCheckList.bind(this);
    }
    onChangeText(state, input) {
        this.setState({
            [state]: input
        });
    }
    onClickCheckList() {
        alert('clicked');
    }
    isTripNameValid() {
        return false;
    }
    isTripDescValid() {
        return false;
    }
    isCurrencyValid() {
        return false;
    }
    saveTrip() {
        alert('TripName: ' + this.state.tripName
            + ' & TripDesc: ' + this.state.tripDesc
            + ' & TripCurrency: ' + this.state.tripCurrency);
    }
    render() {
        const { visible, toggleVisible } = this.props;
        const { formIsValid } = this.state;
        return (React.createElement(Modal, { animationType: "slide", transparent: false, visible: visible, onRequestClose: () => toggleVisible() },
            React.createElement(View, { style: { marginTop: 22, flex: 1 } },
                React.createElement(TextInput, { id: 'tripName', title: 'trip name', titleInvalid: 'trip name is not valid', placeholder: 'The trip name should contain at least 5 characters', onChangeText: this.onChangeText, isValid: formIsValid || this.isTripNameValid }),
                React.createElement(TextInput, { id: 'tripDesc', title: 'trip description', titleInvalid: 'trip description is not valid', placeholder: 'Please enter a description for your trip', onChangeText: this.onChangeText, isValid: formIsValid || this.isTripDescValid }),
                React.createElement(View, { style: { width: 400, marginLeft: 8 } },
                    React.createElement(Dropdown, { key: "tripCurrency", label: 'Select Currency', data: this.currenciesList, onChangeText: (tripCurrency) => this.onChangeText('tripCurrency', tripCurrency), containerStyle: { paddingRight: 15 }, baseColor: (formIsValid || this.isCurrencyValid()) ? 'black' : 'red', dropdownPosition: 1 })),
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(CheckList, { type: 'person', title: 'trip friends', itemList: c.getPersons(), onClick: this.onClickCheckList }))),
            React.createElement(Button, { title: 'Save', onPress: this.saveTrip })));
    }
}
//# sourceMappingURL=TripForm.js.map