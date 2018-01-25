import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput, Picker } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Popup from 'react-native-popup';
import { Person } from '../domain/model/Person';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';

export class PersonSummary extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Name: ' + c.getPerson(navigation.state.params.id).name + '      Filter: ' + navigation.state.params.filter,
    });

    constructor(props) {
        super(props);
    }

    state = {
        personId: this.props.navigation.state.params.id,
        filter: this.props.navigation.state.params.filter,
    }

    getAmountToString(expenseId){
        let amount = c.getPersonPaidAmount(this.state.personId, expenseId);
        let output = 'The amount of this expense has not yet been devided';
        if(amount != 0 && c.getExpense(expenseId).expenseDataMap.get(this.state.personId).isPaid){
            let valuta = c.getTrip(c.getExpense(expenseId).tripId).defaultCurrency.name;
            let dateOfPayment = c.getExpense(expenseId).expenseDataMap.get(this.state.personId).dateOfPayment;
            let string_dateOfPayment = dateOfPayment.getDate() + " / " +  (Number(dateOfPayment.getMonth()) + 1) + " / " + dateOfPayment.getFullYear();
            console.log(string_dateOfPayment);
            output = 'The PAID amount is ' + amount + ' ' + valuta  +  ' on ' + string_dateOfPayment;
        } else if (amount != 0) {
            let valuta = c.getTrip(c.getExpense(expenseId).tripId).defaultCurrency.name;
            output = 'The TO PAY amount is ' + amount + ' ' + valuta;
        }
        return output;
    }

    render() {
        var ExpenseList = [];

        c.getPersonExpenses(this.state.personId, this.state.filter ).forEach(element => {
            ExpenseList.push(
            // elk element in een lus heeft blijkbaar een ID nodig
            <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>{element.description}</Text>
                <Text>{this.getAmountToString(element.id)}</Text>
              </View>
            </TouchableHighlight>
          )

        });
        return (
            <View style={styles.mainViewLayout} >
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                            {ExpenseList}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

