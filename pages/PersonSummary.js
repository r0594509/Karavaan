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
        title: 'Name: ' + c.getPerson(navigation.state.params.id).name,
    });

    constructor(props) {
        super(props);
    }

    state = {
        personId: this.props.navigation.state.params.id,
        filter: this.props.navigation.state.params.filter,
    }

    getAmountToString(expenseId) {
        let amount = c.getPersonPaidAmount(this.state.personId, expenseId);
        let output = 'The amount of this expense has not yet been devided';
        if (amount != 0 && c.getExpense(expenseId).expenseDataMap.get(this.state.personId).isPaid) {
            let valuta = c.getTrip(c.getExpense(expenseId).tripId).defaultCurrency.name;
            let dateOfPayment = c.getExpense(expenseId).expenseDataMap.get(this.state.personId).dateOfPayment;
            let string_dateOfPayment = dateOfPayment.getDate() + " / " + (Number(dateOfPayment.getMonth()) + 1) + " / " + dateOfPayment.getFullYear();
            console.log(string_dateOfPayment);
            output = 'The PAID amount is ' + amount + ' ' + valuta + ' on ' + string_dateOfPayment;
        } else if (amount != 0) {
            let valuta = c.getTrip(c.getExpense(expenseId).tripId).defaultCurrency.name;
            output = 'The TO PAY amount is ' + amount + ' ' + valuta;
        }
        return output;
    }

    refresh(){
        this.forceUpdate();
    }

    goToExpense(expenseId) {
        var tripId = c.getExpense(expenseId).tripId;
        this.props.navigation.navigate('ExpenseScreen', { 
            tripId: tripId, 
            expenseId: expenseId,
            onGoBack: () => this.refresh(), 
        });
    }

    roundAmount(amount) {
        amount = Math.round(amount * 100) / 100;
        return amount;
    }

    render() {
        var ExpenseList = [];
        const { params } = this.props.navigation.state;
        var dropDownData = [];

        dropDownData.push({ value: "ALL" });
        c.getTrips().forEach(element => {
            dropDownData.push({ value: element.name });
        });


        c.getPersonExpenses(this.state.personId, this.state.filter).forEach(element => {
            ExpenseList.push(
                // elk element in een lus heeft blijkbaar een ID nodig
                <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToExpense(element.id)}>
                    <View style={styles.cardLayoutMini}>
                        <Text style={styles.titleText}>{element.description}</Text>
                        <Text>{this.getAmountToString(element.id)}</Text>
                    </View>
                </TouchableHighlight>
            )

        });
        return (
            <View style={styles.mainViewLayout} >
                <View style={{ flex: 1 }}>
                    <Dropdown
                        label='Sort expenses by trips'
                        data={dropDownData}
                        value={this.state.filter}
                        onChangeText={(filter) => this.setState({ filter: filter })}
                        fontSize={20}
                        containerStyle={{ paddingLeft: 15, paddingRight: 15 }}
                        baseColor='rgba(0, 0, 0, 1)'
                        dropdownPosition={1}
                    />
                    <View style={styles.amountsWrapper}>
                        <View style={[styles.amountSquare, { backgroundColor: '#ff8080' }]}>
                            <Text style={[styles.amountSquareText, {color: 'red'}]}>{'To Pay'}</Text>
                            <Text style={[styles.amountSquareText, {color: 'red'}]}>{this.roundAmount(c.getPersonToPayAmountFilterd(this.state.personId, this.state.filter))}</Text>
                        </View>
                        <View style={[styles.amountSquare, { backgroundColor: '#99e699' }]}>
                            <Text style={[styles.amountSquareText, {color: 'green'}]}>{'Paid'}</Text>
                            <Text style={[styles.amountSquareText, {color: 'green'}]}>{this.roundAmount(c.getPersonPaidAmountFilterd(this.state.personId, this.state.filter))}</Text>
                        </View>
                        <View style={[styles.amountSquare, { backgroundColor: '#ffcc66' }]}>
                            <Text style={[styles.amountSquareText, {color: 'orangered'}]}>{'Owed'}</Text>
                            <Text style={[styles.amountSquareText, {color: 'orangered'}]}>{this.roundAmount(c.getPersonOwedAmountFilterd(this.state.personId, this.state.filter))}</Text>
                        </View>
                        <View style={[styles.amountSquare, { backgroundColor: '#80b3ff' }]}>
                            <Text style={[styles.amountSquareText, {color: 'blue'}]}>{'Spend'}</Text>
                            <Text style={[styles.amountSquareText, {color: 'blue'}]}>{this.roundAmount(c.getPersonTotalAmountFilterd(this.state.personId, this.state.filter))}</Text>
                        </View>
                    </View>


                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                        {ExpenseList}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

