import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
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

    state = {
        AmountToDevide: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).amount,
        isDevided: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).isDevided,
        standaardValue: '',
        standaardCss: [styles.titleText, { marginTop: 20 }],
        devideMethodSelected: 'Custom',
    }

    listOfPayedAmounts = {};

    changeDivideMethode(devideMethodSelected) {
        this.setState({ devideMethodSelected: devideMethodSelected });
        friends = c.getTrip(this.props.navigation.state.params.tripId).persons;
        toPayAmount = c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).amount / friends.length;
        toPayAmount = +toPayAmount.toFixed(2);

        if (devideMethodSelected == 'Equal') {
            friends.forEach(person => {
                //this.listOfPayedAmounts[person.id] = toPayAmount;
                this.tempSaveAmount(person.id, toPayAmount);
            })
            console.log(toPayAmount);
            this.setState({ standaardValue: toPayAmount + '' });
            this.setState({ isDevided: true });
        } else if (c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).isDevided == false) {
            friends.forEach(person => {
                //this.listOfPayedAmounts[person.id] = 0;
                this.tempSaveAmount(person.id, 0);
            })
            this.setState({ standaardValue: '' });
            this.setState({ isDevided: false });
        }
    }

    tempSaveAmount(id, amount) {
        var typedAmount = 0;
        var totalAmount = c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).amount;
        var payedAmount = 0;

        if (amount != null) {
            typedAmount = amount;
        }
        this.listOfPayedAmounts[id] = typedAmount;

        for (var k in this.listOfPayedAmounts) {
            if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                var test = this.listOfPayedAmounts[k];
                payedAmount = (payedAmount * 10 + test * 10) / 10;
                payedAmount = +payedAmount.toFixed(2);
            }
        }

        newAmount = totalAmount - payedAmount;

        if (newAmount < 0.01) {
            newAmount = 0;
        }
        this.setState({ AmountToDevide: newAmount });
    }

    isAmountValidated() {
        var payedAmount = 0;
        //var typedAmount = 0;
        var totalAmount = c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).amount;

        for (var k in this.listOfPayedAmounts) {
            if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                var test = this.listOfPayedAmounts[k];
                payedAmount = (payedAmount * 10 + test * 10) / 10;
                //Math.round(payedAmount + 0.00001 * 100) / 100;
                //payedAmount = +payedAmount.toFixed(2);
            }
        }

        newAmount = totalAmount - payedAmount;

        if (newAmount < 0.01 || newAmount == 0) {
            return true;
        } else{
            return false;
        }
    }

    saveExpenseForm() {
        //this.isAmountValidated()
        //this.c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).isAmountValid(this.listOfPayedAmounts)
        //console.log(c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).isAmountPayed(this.listOfPayedAmounts));
        if (this.isAmountValidated()) {
            var expense = c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId);
            expense.isDevided = true;
            for (var k in this.listOfPayedAmounts) {
                if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                   expense.expenseDataMap.get(Number(k)).amount = this.listOfPayedAmounts[k] ;
                }
            }

            this.setState({ isDevided: true });
            this.setState({ standaardCss: [styles.titleText, { marginTop: 20, color: 'black' }] });
            this.forceUpdate();
        } else  if (this.state.isDevided == false){
            this.setState({ standaardCss: [styles.titleText, { marginTop: 20, color: 'red' }] });
        }

    }

    render() {
        const { params } = this.props.navigation.state;

        let data = [{
            value: 'Custom',
        }, {
            value: 'Equal',
        }];

        var expense = c.getExpenseInTrip(params.tripId, params.expenseId);
        //console.log(expense);
        personList = [];
        if (c.getTrip(expense.tripId).persons != null) {
            //console.log(expense);
            c.getTrip(expense.tripId).persons.forEach(element => {
                //console.log(element);
                personList.push(
                    <View style={styles.FormViewExpensePerson} key={'persondetails' + element.id}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.FormText}>{element.name}:</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <TextInput
                                style={[styles.FormInput, { marginTop: -2 }]}
                                placeholder="Amount due"
                                onChangeText={(amount) => this.tempSaveAmount(element.id, amount)}
                                keyboardType='numeric'
                                editable={!this.state.isDevided}
                                //defaultValue={expense.expenseDataMap.get(element.id).amount + this.state.standaardValue}
                                defaultValue={expense.expenseDataMap.get(element.id).amount == 0 ? '' + this.state.standaardValue : expense.expenseDataMap.get(element.id).amount + '' }
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <CheckBox
                                onClick={() => alert(element.id)}
                                isChecked={expense.expenseDataMap.get(element.id).isPaid}
                                style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 50 }}
                            />
                        </View>
                    </View>
                );
            });
        }

        return (
            <View style={styles.mainViewLayout}>
                <View style={{ flex: 1 }}>

                    <Text style={this.state.standaardCss} >Amount to be divided: {this.state.AmountToDevide} {expense.expenseCurrency.name}</Text>

                    <Dropdown
                        label='Divide method'
                        value='Custom'
                        data={data}
                        onChangeText={(devideMethodSelected) => this.changeDivideMethode(devideMethodSelected)}
                        fontSize={20}
                        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        baseColor='rgba(0, 0, 0, 1)'
                        dropdownPosition={1}
                        //editable={!this.state.isDevided}
                    />
                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                        {personList}
                    </ScrollView>

                    <TouchableHighlight onPress={() => this.saveExpenseForm()} style={styles.ButtonLayoutMain}>
                        <View>
                            <Text style={styles.ButtonText}>Save</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}