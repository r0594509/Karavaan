import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';

import { Dropdown } from 'react-native-material-dropdown';

import c from '../domain/controller/Controller';

export class Rates extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let editCurrencyDropdown = [];
        let currencyOptions = [];
        let isInList = false;

        c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
            currencyOptions.push({value: element.code})
            if (element.code == c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code) {
                isInList = true;
            }
        }); 

        if (!isInList) {
            let m = c.getTrip(this.props.navigation.state.params.id).defaultCurrency;
            currencyOptions.push({value: m.code});
        }

        return (
            <View style={styles.mainViewLayout}>
                <Text>TEST</Text>

                <Dropdown
                    key='001'
                    label='Select currency to edit:'
                    value='None'
                    data={currencyOptions}
                    onChangeText={(x) => console.log(x)}
                    fontSize={20}
                    containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                    baseColor='rgba(0, 0, 0, 1)'
                    dropdownPosition={1}
                />
            </View>
        );
    }
}