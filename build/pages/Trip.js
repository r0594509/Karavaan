import React from 'react';
import { Text, View, ScrollView, TouchableHighlight, Modal, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import Popup from 'react-native-popup';
import { Expense } from '../domain/model/Expense';
import { Category } from '../domain/model/Category';
import { Currencies } from 'ts-money';
import DatePicker from 'react-native-datepicker';
export class Trip extends React.Component {
    constructor(props) {
        super(props);
        //Initiele Status van de modal (pop-up venster)
        this.state = {
            modalVisible: false,
            formNameIsValid: true,
            formAmntIsValid: true,
            formDateIsValid: true,
            expenseCategory: null,
            expenseCurrency: c.getTrip(this.props.navigation.state.params.id).defaultCurrency,
            expenseCategorySelected: Category.All,
            categoryTitle: "Sort trips by category",
            categoryFormTitle: 'Select Category',
            currencyFormTitle: 'Select Currency',
        };
    }
    goToExpense(tripId, expenseId) {
        this.props.navigation.navigate('ExpenseScreen', { tripId: tripId, expenseId: expenseId });
    }
    handleOnSave_newExpenseForm() {
        this.saveNewExpense();
    }
    removeItem(id) {
        const { params } = this.props.navigation.state;
        this.popup.confirm({
            title: 'Remove',
            content: ['Do you want to remove,', 'Expense: ' + c.getExpensesForTrip(params.id, id).description],
            ok: {
                text: 'Yes',
                style: {
                    color: 'red'
                },
                callback: () => {
                    this.popup.alert(c.getExpensesForTrip(params.id, id).description + ' has been removed!');
                    c.removeExpenseInTrip(params.id, id);
                    // force a view update by calling setState method
                    this.setState({ update: true });
                },
            },
            cancel: {
                text: 'No',
                style: {
                    color: 'black'
                },
                callback: () => {
                    this.popup.alert(c.getExpensesForTrip(params.id, id).description + ' has not been removed.');
                },
            },
        });
    }
    isExpenceValid(amount) {
        var re = new RegExp('^[0-9]{1,3}(?:\.[0-9]{2})*$');
        if (amount === null) {
            return false;
        }
        else if (amount.match(re)) {
            if (amount < 0) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
        ;
    }
    saveNewExpense() {
        let name = this.state.expenseName;
        let amnt = this.state.expenseAmnt;
        let date = this.state.expenseDate;
        let category = this.state.expenseCategory;
        let currency = this.state.expenseCurrency;
        let errors = 0;
        //DEBUG
        if (false) {
            const { params } = this.props.navigation.state;
            let expense = new Expense(params.id, "Debug expense", Category.Food, new Date(2017, 12, 24, 0, 0, 0, 0), 133, false, Currencies.USD);
            c.addExpense(expense);
            this.toggleModalVisible();
            // clear state for next form
            this.state.expenseName = null;
            this.state.expenseAmnt = null;
            this.state.expenseDate = null;
            this.state.expenseCategory = null;
            this.state.expenseCurrency = null;
            return null;
        }
        if (category == null) {
            errors++;
            this.setState({ expenseCategoryIsValid: false });
        }
        else {
            this.setState({ expenseCategoryIsValid: true });
        }
        if (currency == null) {
            currency = c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code;
            //errors++;
            //this.setState({ expenseCurrencyIsValid: false});
        }
        else {
            this.setState({ expenseCurrencyIsValid: true });
        }
        if (!Expense.isValidExpenseName(name)) {
            errors++;
            this.setState({ formNameIsValid: false });
        }
        else {
            this.setState({ formNameIsValid: true });
        }
        if (!this.isExpenceValid(amnt)) {
            errors++;
            this.setState({ formAmntIsValid: false });
        }
        else {
            this.setState({ formAmntIsValid: true });
        }
        if (!Expense.isValidExpenseDate(date)) {
            errors++;
            this.setState({ formDateIsValid: false });
        }
        else {
            this.setState({ formDateIsValid: true });
        }
        if (errors === 0) {
            const { params } = this.props.navigation.state;
            let expense = new Expense(params.id, name, Category[category], Expense.toDate(date), Number(amnt), /*idDevided=HARDCODED*/ false, Currencies[currency]);
            c.addExpense(expense);
            this.toggleModalVisible();
            // clear state for next form
            this.state.expenseName = null;
            this.state.expenseAmnt = null;
            this.state.expenseDate = null;
            this.state.expenseCategory = null;
            this.state.expenseCurrency = null;
        }
    }
    handleOnCancel_newExpenseForm() {
        this.toggleModalVisible();
        this.setState({ formNameIsValid: true });
        this.setState({ formAmntIsValid: true });
        this.setState({ formDateIsValid: true });
        this.setState({ expenseCategoryIsValid: true });
        this.setState({ expenseCurrencyIsValid: true });
        this.state.expenseName = null;
        this.state.expenseAmnt = null;
        this.state.expenseDate = null;
        this.state.expenseCategory = null;
        this.state.expenseCurrency = null;
    }
    toggleModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    goSettings(id) {
        this.props.navigation.navigate('RatesScreen', { id: id });
    }
    //Rendert het venster
    render() {
        const { params } = this.props.navigation.state;
        let data = [];
        for (var n in Category) {
            if (typeof Category[n] === 'string')
                data.push({ value: n });
        }
        let dataForm = [];
        for (var n in Category) {
            if (typeof Category[n] === 'string')
                dataForm.push({ value: n });
        }
        //Do not allow users to create a new expense of caregoty "all"
        dataForm.shift();
        //let currenciesList = c.getTenMostPopularCurrencies();
        let currenciesList = [];
        let isInList = false;
        c.getTrip(this.props.navigation.state.params.id).relevantCurrencies.forEach(element => {
            currenciesList.push({ value: element.code });
            if (element.code == c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code) {
                isInList = true;
            }
        });
        if (!isInList) {
            let m = c.getTrip(this.props.navigation.state.params.id).defaultCurrency;
            currenciesList.push({ value: m.code });
        }
        //let currenciesList = [];
        //for (var n in Currencies) {
        //console.log(Currencies[n].code);
        //  if (Currencies[n].code != "ALL") {
        //    currenciesList.push({value: n});
        //  }
        //}
        var textLoop = [];
        c.getExpensesForTrip(params.id, this.state.expenseCategorySelected).forEach(element => {
            //console.log(element.id);
            textLoop.push(
            // Zijn de CARDS waarop gedrukt kan worden om venster te openen
            // N: iterations need a unique key
            React.createElement(TouchableHighlight, { key: element.id, style: { borderRadius: 5, margin: 5, }, onPress: () => this.goToExpense(params.id, element.id), onLongPress: () => this.removeItem(element.id) },
                React.createElement(View, { style: styles.cardLayout },
                    React.createElement(Text, { style: styles.titleText },
                        "Name: ",
                        element.description),
                    React.createElement(Text, null,
                        "Description: ",
                        element.amount))));
        });
        var formName = [];
        var formAmnt = [];
        var formDate = [];
        var categoryFormDropDown = [];
        var currencyFormDropDown = [];
        if (this.state.formNameIsValid) {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormText }, "EXPENSE NAME"));
        }
        else {
            formName.push(React.createElement(Text, { key: "formName", style: styles.FormTextInvalid }, "EXPENSE NAME IS NOT VALID"));
        }
        if (this.state.formAmntIsValid) {
            formAmnt.push(React.createElement(Text, { key: "formAmnt", style: styles.FormText }, "EXPENSE AMOUNT"));
        }
        else {
            formAmnt.push(React.createElement(Text, { key: "formAmnt", style: styles.FormTextInvalid }, "EXPENSE AMOUNT IS NOT VALID"));
        }
        if (this.state.formDateIsValid) {
            formDate.push(React.createElement(Text, { key: "formDate", style: styles.FormText }, "EXPENSE DATE"));
        }
        else {
            formDate.push(React.createElement(Text, { key: "formDate", style: styles.FormTextInvalid }, "EXPENSE DATE IS NOT VALID"));
        }
        if (this.state.expenseCategoryIsValid) {
            categoryFormDropDown.push(React.createElement(Dropdown, { key: "categorydormdropdown", label: this.state.categoryFormTitle, data: dataForm, onChangeText: (expenseCategory) => this.setState({ expenseCategory: expenseCategory }), 
                //fontSize={16}
                containerStyle: { paddingLeft: 15 }, baseColor: 'black', dropdownPosition: 1 }));
        }
        else {
            categoryFormDropDown.push(React.createElement(Dropdown, { key: "categorydormdropdown", label: this.state.categoryFormTitle, data: dataForm, onChangeText: (expenseCategory) => this.setState({ expenseCategory: expenseCategory }), 
                //fontSize={16}
                containerStyle: { paddingLeft: 15 }, baseColor: 'red', dropdownPosition: 1 }));
        }
        if (this.state.expenseCurrencyIsValid) {
            currencyFormDropDown.push(React.createElement(Dropdown, { key: "currencydormdropdown", label: this.state.currencyFormTitle, value: c.getTrip(this.props.navigation.state.params.id).defaultCurrency.code, data: currenciesList, onChangeText: (expenseCurrency) => this.setState({ expenseCurrency: expenseCurrency }), 
                //fontSize={16}
                containerStyle: { paddingRight: 15 }, baseColor: 'black', dropdownPosition: 1 }));
        }
        else {
            currencyFormDropDown.push(React.createElement(Dropdown, { key: "currencydormdropdown", label: this.state.currencyFormTitle, data: currenciesList, onChangeText: (expenseCurrency) => this.setState({ expenseCurrency: expenseCurrency }), 
                //fontSize={16}
                containerStyle: { paddingRight: 15 }, baseColor: 'red', dropdownPosition: 1 }));
        }
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(Dropdown, { label: this.state.categoryTitle, data: data, onChangeText: (expenseCategorySelected) => this.setState({ expenseCategorySelected: expenseCategorySelected }), fontSize: 20, containerStyle: { paddingLeft: 15, paddingRight: 15 }, baseColor: 'rgba(0, 0, 0, 1)', dropdownPosition: 1 }),
                React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, textLoop),
                React.createElement(View, null,
                    React.createElement(TouchableHighlight, { onPress: () => this.handleOnCancel_newExpenseForm(), style: styles.ButtonLayoutMain },
                        React.createElement(View, null,
                            React.createElement(Text, { style: styles.ButtonText }, "Add Expense"))),
                    React.createElement(TouchableHighlight, { onPress: () => this.goSettings(this.props.navigation.state.params.id), style: styles.ButtonLayoutMain },
                        React.createElement(View, null,
                            React.createElement(Text, { style: styles.ButtonText }, "Settings")))),
                React.createElement(Modal, { animationType: "slide", transparent: false, visible: this.state.modalVisible, onRequestClose: () => this.toggleModalVisible() },
                    React.createElement(View, { style: { marginTop: 22, flex: 1 } },
                        formName,
                        React.createElement(TextInput, { style: styles.FormInput, placeholder: "Type the expense name here!", onChangeText: (expenseName) => this.setState({ expenseName }) }),
                        React.createElement(View, { style: { flexDirection: 'row' } },
                            React.createElement(View, { style: { flex: 1 } }, categoryFormDropDown),
                            React.createElement(View, { style: { width: 200, marginLeft: 8 } },
                                formDate,
                                React.createElement(DatePicker
                                //style={[styles.FormInput, { marginTop: -2 }]}
                                , { 
                                    //style={[styles.FormInput, { marginTop: -2 }]}
                                    date: this.state.expenseDate, mode: "date", placeholder: "Expense Date", format: "DD-MM-YYYY", minDate: "01-01-2000", maxDate: "01-01-2999", confirmBtnText: "Confirm", cancelBtnText: "Cancel", onDateChange: (expenseDate) => this.setState({ expenseDate }) }))),
                        React.createElement(View, { style: { flexDirection: 'row' } },
                            React.createElement(View, { style: { flex: 1 } },
                                formAmnt,
                                React.createElement(TextInput, { style: [styles.FormInput, { marginTop: -2 }], placeholder: "Expense Amount", onChangeText: (expenseAmnt) => this.setState({ expenseAmnt }), keyboardType: 'numeric' })),
                            React.createElement(View, { style: { width: 200, marginLeft: 8 } }, currencyFormDropDown))),
                    React.createElement(View, null,
                        React.createElement(TouchableHighlight, { onPress: () => this.handleOnSave_newExpenseForm(), style: styles.ButtonLayoutMain },
                            React.createElement(View, null,
                                React.createElement(Text, { style: styles.ButtonText }, "Save"))))),
                React.createElement(Popup, { ref: popup => this.popup = popup }))));
    }
}
Trip.navigationOptions = ({ navigation }) => ({
    //title: `Trip: ${navigation.state.params.id}`,
    title: 'Trip: ' + c.getTrip(navigation.state.params.id).name,
});
//# sourceMappingURL=Trip.js.map