import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';
import { Dropdown } from 'react-native-material-dropdown';

import c from '../domain/controller/Controller';

export class Rates extends React.Component {

    state = {
        currency: null,
        rates: {},
        invalid: [],
    }

    constructor(props) {
        super(props);
        this.state.rates = c.getTrip(this.props.navigation.state.params.id).rates;
    }

    isValidRate(amount) {
        return  amount &&
                amount.match(new RegExp('^[0-9]{1,3}(?:\.(?:[0-9]{1,2})+)*$')) &&
                Number(amount) > 0 &&
                Number(amount) != 1;
    }

    editCurrency(currency, amount) {
        if (this.isValidRate(amount)) {
            var fx = require("money");
            fx.base = "EUR";
            fx.rates = c.getTrip(
                this.props.navigation.state.params.id
            ).rates;

            if (this.state.currency != fx.base) {
                this.state.rates = {
                    ...this.state.rates,
                    ...{[this.state.currency]: Number(
                            fx(1)
                            .from(currency)
                            .to(fx.base)
                        ) * 1/amount,
                    },
                };
            } else {
                this.state.rates = {
                    ...this.state.rates,
                    ...{[currency]: Number(amount)},
                };
            }
        } else {
            this.state.invalid.push(currency);
            this.forceUpdate();
        }
    }

    saveCurrencies() {
        //TODO some validation
        c.getTrip(this.props.navigation.state.params.id).rates = this.state.rates;
    }

    render() {

        let editCurrencyDropdown = [];
        let currencyOptions = [];
        let isInList = false;

        c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
            editCurrencyDropdown.push({value: element.code})
            if (element.code == c.getTrip(
                this.props.navigation.state.params.id).defaultCurrency.code
            ) {
                isInList = true;
            }
        }); 

        if (!isInList) {
            let m = c.getTrip(this.props.navigation.state.params.id).defaultCurrency;
            editCurrencyDropdown.push({value: m.code});
        }

        if (this.state.currency) {

            var fx = require("money");
            fx.base = "EUR";
            fx.rates = c.getTrip(this.props.navigation.state.params.id).rates;
            var i = 0;
            c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach( element => {

                if ( element.code != this.state.currency) {

                    let rate = String(
                        fx(1)
                        .from(this.state.currency)
                        .to(element.code)
                    );
                    rate = rate.slice(
                        0, 
                        rate.length > 13 ? 13 - rate.length : rate.length
                    );

                    currencyOptions.push(
                        <View 
                            style={ !(element.code in this.state.invalid) ?
                                styles.FormViewExpensePerson: styles.FormViewExpensePersonInvalid
                            }
                            key={'currency' + i++}
                            >
                            <View style={{ flex: 1 }}>
                                <Text style={styles.FormText}> 1 {this.state.currency} = </Text>
                            </View>
                            
                            <View style={{ width: 150 }}>
                                <TextInput
                                    style={[styles.FormInput, { marginTop: -2 }]}
                                    placeholder={rate}
                                    onChangeText={(x) => this.editCurrency(element.code, x)}
                                    keyboardType='numeric'
                                    defaultValue={rate}
                                ></TextInput>
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                <Text style={styles.FormText}> {element.code} </Text>
                            </View>
                        </View>
                    );
                }
            });

            currencyOptions.push(
                <TouchableHighlight key='002' onPress={() => saveCurrencies()} style={styles.ButtonLayoutMain}>
                    <View>
                        <Text style={styles.ButtonText}>SAVE RATES</Text>
                    </View>
                </TouchableHighlight>
            );
        }

        return (
            <View style={styles.mainViewLayout}>

                <Dropdown
                    key='001'
                    label='Select currency to edit:'
                    value={this.state.currency || 'None' }
                    data={editCurrencyDropdown}
                    onChangeText={(x) => {
                            this.setState({currency: x});
                        }
                    }
                    fontSize={20}
                    containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                    baseColor='rgba(0, 0, 0, 1)'
                    dropdownPosition={1}
                />

                {currencyOptions}

            </View>
        );
    }
}