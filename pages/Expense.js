import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import Popup from 'react-native-popup';


export class Expense extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Expense: ' + c.getExpenseInTrip(navigation.state.params.tripId, navigation.state.params.expenseId).description,
    });

    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.navigation.state;    

        let expense = c.getExpenseInTrip(params.tripId, params.expenseId);

        textLoop = [];
        textLoop.push(
            <View style={styles.mainViewLayout} key='expensedetails'>
                <Text>Total expense: {expense.amount} {expense.defaultCurrency.name}</Text>
                <Text>expense category: {expense.category}</Text>
                <Text>expense date: {expense.date.getDate()}-{expense.date.getMonth()}-{expense.date.getFullYear()}</Text>
            </View>
        );

        personList = [];
        if (expense.persons != null) {
            expense.persons.forEach(element => {
                personList.push(
                    <View style={styles.mainViewLayout} key={'persondetails'+element.id}>
                        <Text>{element.name}</Text>
                    </View>
                );
            });
        }

        return (
            <View style={styles.mainViewLayout}>
                <View style={{ flex: 1 }}>
                    {textLoop}
                </View>
                <ScrollView contentContainer={{ paddingVertical: 20 }}>
                    {personList}
                </ScrollView>
            </View>
        );
    }
}