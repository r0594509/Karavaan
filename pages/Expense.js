import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import Popup from 'react-native-popup';


export class Expense extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: c.getExpenseInTrip(navigation.state.params.tripId, navigation.state.params.expenseId).description,
        //header: { visible:false }  
    });

    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.navigation.state;

        let data = [{
            value: 'Equal',
        }, {
            value: 'Custom',
        }];

        let expense = c.getExpenseInTrip(params.tripId, params.expenseId);

        textLoop = [];
        textLoop.push(
            <View style={styles.mainViewLayout} key='expensedetails'>
                <Text style={[styles.titleText, { marginTop: 10 }]} >Amount to be divided: {expense.amount} {expense.defaultCurrency.name}</Text>
                {/* <Text>expense category: {expense.category}</Text>*/}
                {/* <Text>expense date: {expense.date.getDate()}-{expense.date.getMonth()}-{expense.date.getFullYear()}</Text>*/}
            </View>
        );

        personList = [];
        if (expense.persons != null) {
            expense.persons.forEach(element => {
                personList.push(
                    <View style={styles.FormViewExpensePerson} key={'persondetails' + element.id}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.FormText}>{element.name}:</Text>
                        </View>
                        <View style={{ width: 200 }}>
                            <TextInput
                                style={[styles.FormInput, { marginTop: -2 }]}
                                placeholder="Amount due"
                                //onChangeText={(expenseDate) => this.setState({ expenseDate })}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                );
            });
        }

        return (
            <View style={styles.mainViewLayout}>
                <View style={{ flex: 1 }}>

                    <Text style={[styles.titleText, { marginTop: 20 }]} >Amount to be divided: {expense.amount} {expense.defaultCurrency.name}</Text>

                    <Dropdown
                        label='Divide method'
                        data={data}
                        //onChangeText={(expenseCategorySelected) => this.setState({ expenseCategorySelected: expenseCategorySelected })}
                        fontSize={20}
                        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        baseColor='rgba(0, 0, 0, 1)'
                        dropdownPosition={1}
                    />
                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                        {personList}
                    </ScrollView>

                    <TouchableHighlight onPress={() => echo('oke')} style={styles.ButtonLayoutMain}>
                        <View>
                            <Text style={styles.ButtonText}>Save</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}