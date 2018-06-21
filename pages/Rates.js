import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';

import { Dropdown } from 'react-native-material-dropdown';

import c from '../domain/controller/Controller';

export class Rates extends React.Component {

    state = {
        currency: null,
    }

    constructor(props) {
        super(props);
    }

    render() {

        let editCurrencyDropdown = [];
        let currencyOptions = [];
        let isInList = false;

        c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
            editCurrencyDropdown.push({value: element.code})
            if (element.code == c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code) {
                isInList = true;
            }
        }); 

        if (!isInList) {
            let m = c.getTrip(this.props.navigation.state.params.id).defaultCurrency;
            editCurrencyDropdown.push({value: m.code});
        }


        if (this.state.currency) {

            c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach( element => {

                if ( element.code != this.state.currency) {
                    
                    currencyOptions.push(
                        <View style={styles.FormViewExpensePerson} key={'currency' + element.code}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.FormText}> {this.state.currency} </Text>
                            </View>
                            
                            <View style={{ width: 150 }}>
                                <TextInput
                                    style={[styles.FormInput, { marginTop: -2 }]}
                                    placeholder="rate"
                                    onChangeText={(x) => console.log(x)}
                                    keyboardType='numeric'
                                    //editable='True'
                                    defaultValue="test value"
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
                <TouchableHighlight key='002' onPress={() => console.log("XXX")} style={styles.ButtonLayoutMain}>
                    <View>
                        <Text style={styles.ButtonText}>SAVE</Text>
                    </View>
                </TouchableHighlight>
            );
        }

        return (
            <View style={styles.mainViewLayout}>

                <Dropdown
                    key='001'
                    label='Select currency to edit:'
                    value='None'
                    data={editCurrencyDropdown}
                    onChangeText={(x) => {
                            this.setState({currency: x});
                            //this.forceUpdate();
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