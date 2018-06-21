import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import Popup from 'react-native-popup';
import { PersonExpenseData } from '../domain/model/PersonExpenseData';
import { ExpenseModel } from '../domain/model/Expense';
import { Money, Currencies, Currency } from 'ts-money';

export class Expense extends React.Component {


    static navigationOptions = ({ navigation }) => ({
        title: c.getExpenseInTrip(navigation.state.params.tripId, navigation.state.params.expenseId).description,
        //header: { visible:false }  
    });

    constructor(props) {
        super(props);

        this.isGivenAmountValid = this.isGivenAmountValid.bind(this);
    }

    state = {
        currentExpense: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId),
        modalVisible: false,
        AmountToDevide: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).AmountLeftToPay(),
        isDevided: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).isDevided,
        expenseDate: this.formatDate(c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).date),
        standaardValue: '',
        standaardCss: [styles.titleText, { marginTop: 20 }],
        devideMethodSelected: 'Custom',
        currency: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).expenseCurrency.code,
    }

    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    isGivenAmountValid(amount) {
        const re = new RegExp('^[0-9]{1,3}(?:\.(?:[0-9]{1,2})+)*$');

        if (!amount) {
            return false;
        } else if (amount.match(re)) {
            if (amount < 0) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    listOfPayedAmounts = {};

    changeDivideMethode(devideMethodSelected) {

        this.setState({ devideMethodSelected: devideMethodSelected });
        friends = c.getTrip(this.props.navigation.state.params.tripId).persons;

        if (devideMethodSelected == 'Equal') {
            equalyDevidedAmount = this.state.currentExpense.devideAmountEqualy();
            
            friends.forEach(person => {
                    this.tempSaveAmount(person.id, equalyDevidedAmount);
            })
            this.setState({ standaardValue: equalyDevidedAmount + '' });
            //this.setState({ isDevided: true });
        } else if (this.state.currentExpense.isDevided == false) {
            friends.forEach(person => {
                this.tempSaveAmount(person.id, 0);
            })
            this.setState({ standaardValue: '' });
            this.setState({ isDevided: false });
        }
    }

    tempSaveAmount(id, amount) {
        const divisibleAmountToPay = this.state.currentExpense.makeAmountDivisible();
        var payedAmount = 0;
        var typedAmount = 0;
        if (this.state.devideMethodSelected != 'Equal') {
            if (this.isGivenAmountValid(amount)) {
                typedAmount = amount;
            } else if (!amount) {
                typedAmount = 0;
            } else {
                alert('Must only contain a valid amount!');
                return;
            }
        } else {
            typedAmount = amount;
        }

        //if (!this.state.currentExpense.expenseDataMap.get(id).isOwner) {
            this.listOfPayedAmounts[id] = typedAmount;
        //} else {
        //    this.listOfPayedAmounts[id] = Number(0);
        //}

        for (var k in this.listOfPayedAmounts) {
            if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                var test = this.listOfPayedAmounts[k];
                payedAmount = (payedAmount * 10 + test * 10) / 10;
                payedAmount = +payedAmount.toFixed(2);
            }
        }

        newAmount = divisibleAmountToPay - payedAmount;
        newAmount = + newAmount.toFixed(2);

        this.setState({ AmountToDevide: newAmount });
    }

    saveExpenseForm() {

        if (this.state.currentExpense.isAmountPayed(this.getAmountsPayed())) {
            var expense = this.state.currentExpense;
            expense.isDevided = true;
            for (var k in this.listOfPayedAmounts) {
                if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                    expense.expenseDataMap.get(Number(k)).amount = this.listOfPayedAmounts[k];
                }
            }

            this.setState({ isDevided: true });
            this.setState({ standaardCss: [styles.titleText, { marginTop: 20, color: 'black' }] });
            this.forceUpdate();
            if (this.props.navigation.state.params.onGoBack !== undefined){
                this.props.navigation.state.params.onGoBack();
            }
        } else if (this.state.isDevided == false) {
            this.setState({ standaardCss: [styles.titleText, { marginTop: 20, color: 'red' }] });
        }
    }

    getAmountsPayed() {
        var amounts = [];
        for (var k in this.listOfPayedAmounts) {
            if (this.listOfPayedAmounts.hasOwnProperty(k)) {
                amounts.push(this.listOfPayedAmounts[k]);
            }
        }
        return amounts;
    }

    toggleHasPayedHisPart(id) {
        this.state.currentExpense.expenseDataMap.get(id).toggleIsPaid();
    }

    toggleModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    calculatedValutaAmount(amount){
        let expense = c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId);

        var expenseDefaultValueCode = expense.expenseCurrency.code;
        var selectedValuta = this.state.currency;

        var fx = require('money');
        fx.base = "EUR"
        fx.rates = c.getTrip(this.props.navigation.state.params.tripId).rates;

        var tempAmount = parseFloat(amount);

        if(selectedValuta !== expenseDefaultValueCode) {

            temp = fx(tempAmount).from(expenseDefaultValueCode).to(selectedValuta);
            temp = Math.round(temp * 100) / 100
            return temp + '';
        }

        return amount;
    }

    render() {
        const { params } = this.props.navigation.state;

        // this.calculatedValutaAmount(50.00);

        let data = [{
            value: 'Custom',
        }, {
            value: 'Equal',
        }];

        let parent = c.getTrip(params.tripId);
        let expense = c.getExpenseInTrip(params.tripId, params.expenseId);
        let expensePersonArray = c.getTrip(expense.tripId).persons;

        currencyList = [];
        parent.relevantCurrencies.forEach(c => {
            currencyList.push({value: c.code});
        });

        ownerButton = [];
        personList = [];
        ownerList = [];
        dropDown = [];
        saveButton = [];

        if (expensePersonArray != null) {
            let personName = "";
            expensePersonArray.forEach(x => {
                if (expense.expenseDataMap.get(x.id).isOwner) {
                    personName = x.name;
                }
            })

            if (personName !== "") {
                ownerButton.push(
                    <Text key='whopays' style={styles.ButtonText}>{this.state.currentExpense.expenseCurrency.symbol_native}{this.state.currentExpense.amount} paid in advance by {personName}</Text>
                );
            } else {
                ownerButton.push(
                    <Text key='whopays' style={styles.ButtonText}>{this.state.currentExpense.expenseCurrency.symbol_native}{this.state.currentExpense.amount} paid in advanceby no one</Text>
                );
            }
        }

        if (this.state.currentExpense.isDevided == false) {
            dropDown.push(<Dropdown
                key='001'
                label='Divide method'
                value='Custom'
                data={data}
                onChangeText={(devideMethodSelected) => this.changeDivideMethode(devideMethodSelected)}
                fontSize={20}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                baseColor='rgba(0, 0, 0, 1)'
                dropdownPosition={1}
            />
            );

            saveButton.push(
                <TouchableHighlight key='001' onPress={() => this.saveExpenseForm()} style={styles.ButtonLayoutMain}>
                    <View>
                        <Text style={styles.ButtonText}>Save</Text>
                    </View>
                </TouchableHighlight>
            );
        }
        if (expensePersonArray != null) {
            expensePersonArray.forEach(element => {
                //Owners do not have to contribute to the amount left to be payed.
                //if (!expense.expenseDataMap.get(element.id).isOwner) {
                    //console.log(element);
                    personList.push(
                        <View style={styles.FormViewExpensePerson} key={'persondetails' + element.id}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.FormText}>{element.name} owes:</Text>
                            </View>
                            <View>
                                <Text>
                                    {expense.expenseCurrency.symbol_native}
                                </Text>
                            </View>
                            <View style={{ width: 150 }}>
                                <TextInput
                                    style={[styles.FormInput, { marginTop: -2 }]}
                                    placeholder="Amount due"
                                    onChangeText={(amount) => this.tempSaveAmount(element.id, amount)}
                                    keyboardType='numeric'
                                    editable={!this.state.isDevided}
                                    //defaultValue={expense.expenseDataMap.get(element.id).amount + this.state.standaardValue}
                                    defaultValue={this.calculatedValutaAmount(expense.expenseDataMap.get(element.id).amount == 0 ? '' + this.state.standaardValue : expense.expenseDataMap.get(element.id).amount + '')}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <CheckBox
                                    onClick={() => this.toggleHasPayedHisPart(element.id)}
                                    isChecked={expense.expenseDataMap.get(element.id).isPaid}
                                    style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 50 }}
                                />
                            </View>
                        </View>
                    );
                //}
            });
        }

        if (expensePersonArray != null) {
            expensePersonArray.forEach(element => {
                ownerList.push(
                    <View style={styles.FormViewExpensePerson} key={'ownerdetails' + element.id}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.FormText}>{element.name}:</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <CheckBox
                                onClick={() => {
                                    expense.expenseDataMap.forEach( (value, key) => {
                                        value.isOwner = (key == element.id) ? !value.isOwner : false;
                                    });
                                    this.toggleModalVisible();
                                }}
                                isChecked={expense.expenseDataMap.get(element.id).isOwner}
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

                    <Text style={this.state.standaardCss} >Expense date: {this.state.expenseDate}</Text>
                    {(!this.state.currentExpense.isDevided) &&
                        <Text style={this.state.standaardCss} >Amount to be divided: {this.state.AmountToDevide} {expense.expenseCurrency.name}</Text>
                    }           
                    {(!expense.isThereAnOwner()) &&
                        <TouchableHighlight onPress={() => this.toggleModalVisible()} style={[styles.ButtonLayoutMain, { marginLeft: 20, marginRight: 20, }]}>
                            <View>
                                {ownerButton}
                            </View>
                        </TouchableHighlight>
                    }
                    {(expense.isThereAnOwner()) &&
                        <Text style={this.state.standaardCss} >Owner: {c.getPerson(expense.getOwner()).name}</Text>
                    }

                    {(this.state.currentExpense.isDevided) &&
                        <Dropdown
                            label='Currency'
                            data={currencyList}
                            value={expense.expenseCurrency.code}
                            onChangeText={(filter) => this.setState({ currency: filter })}
                            fontSize={20}
                            containerStyle={{ paddingLeft: 15, paddingRight: 15 }}
                            baseColor='rgba(0, 0, 0, 1)'
                            dropdownPosition={1}
                        />
                    }    

                    {dropDown}
                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                        {personList}
                    </ScrollView>

                    {saveButton}

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.toggleModalVisible()}
                    >
                        <ScrollView contentContainer={{ paddingVertical: 20 }}>
                            <Text>Select the expense owner:</Text>
                            {ownerList}
                        </ScrollView>
                    </Modal>

                </View>
            </View>
        );
    }
}