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
                <Text>{expense.amount} {expense.defaultCurrency.name}</Text>
                <Text>{expense.category}</Text>
            </View>
        );

        return (
            <View style={styles.mainViewLayout}>
                <View style={{ flex: 1 }}>
                    {textLoop}
                </View>
            </View>
        );
    }
}