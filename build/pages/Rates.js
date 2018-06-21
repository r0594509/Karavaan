import React from 'react';
import { Text, View, TouchableHighlight, TextInput } from 'react-native';
import styles from '../styles/styles';
import { Dropdown } from 'react-native-material-dropdown';
import c from '../domain/controller/Controller';
export class Rates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: null,
        };
    }
    render() {
        let editCurrencyDropdown = [];
        let currencyOptions = [];
        let isInList = false;
        c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
            editCurrencyDropdown.push({ value: element.code });
            if (element.code == c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code) {
                isInList = true;
            }
        });
        if (!isInList) {
            let m = c.getTrip(this.props.navigation.state.params.id).defaultCurrency;
            editCurrencyDropdown.push({ value: m.code });
        }
        if (this.state.currency) {
            c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
                if (element.code != this.state.currency) {
                    var fx = require("money");
                    fx.base = "EUR";
                    fx.rates = c.getTrip(this.props.navigation.state.params.id).rates;
                    console.log(fx.convert(1, { from: this.state.currency, to: element.code }));
                    currencyOptions.push(React.createElement(View, { style: styles.FormViewExpensePerson, key: 'currency' + element.code },
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(Text, { style: styles.FormText },
                                " 1 ",
                                this.state.currency,
                                " = ")),
                        React.createElement(View, { style: { width: 150 } },
                            React.createElement(TextInput, { style: [styles.FormInput, { marginTop: -2 }], placeholder: "rate", onChangeText: (x) => console.log(x), keyboardType: 'numeric' })),
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(Text, { style: styles.FormText },
                                " ",
                                element.code,
                                " "))));
                }
            });
            currencyOptions.push(React.createElement(TouchableHighlight, { key: '002', onPress: () => console.log("XXX"), style: styles.ButtonLayoutMain },
                React.createElement(View, null,
                    React.createElement(Text, { style: styles.ButtonText }, "SAVE"))));
        }
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(Dropdown, { key: '001', label: 'Select currency to edit:', value: 'None', data: editCurrencyDropdown, onChangeText: (x) => {
                    this.setState({ currency: x });
                }, fontSize: 20, containerStyle: { paddingLeft: 20, paddingRight: 20 }, baseColor: 'rgba(0, 0, 0, 1)', dropdownPosition: 1 }),
            currencyOptions));
    }
}
//# sourceMappingURL=Rates.js.map