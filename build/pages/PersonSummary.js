import React from 'react';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
export class PersonSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personId: this.props.navigation.state.params.id,
            filter: this.props.navigation.state.params.filter,
        };
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
        }
        else if (amount != 0) {
            let valuta = c.getTrip(c.getExpense(expenseId).tripId).defaultCurrency.name;
            output = 'The TO PAY amount is ' + amount + ' ' + valuta;
        }
        return output;
    }
    refresh() {
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
            React.createElement(TouchableHighlight, { key: element.id, style: { borderRadius: 5, margin: 5, }, onPress: () => this.goToExpense(element.id) },
                React.createElement(View, { style: styles.cardLayoutMini },
                    React.createElement(Text, { style: styles.titleText }, element.description),
                    React.createElement(Text, null, this.getAmountToString(element.id)))));
        });
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(Dropdown, { label: 'Sort expenses by trips', data: dropDownData, value: this.state.filter, onChangeText: (filter) => this.setState({ filter: filter }), fontSize: 20, containerStyle: { paddingLeft: 15, paddingRight: 15 }, baseColor: 'rgba(0, 0, 0, 1)', dropdownPosition: 1 }),
                React.createElement(View, { style: styles.amountsWrapper },
                    React.createElement(View, { style: [styles.amountSquare, { backgroundColor: '#ff8080' }] },
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'red' }] }, 'To Pay'),
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'red' }] }, c.getPersonToPayAmountFilterd(this.state.personId, this.state.filter))),
                    React.createElement(View, { style: [styles.amountSquare, { backgroundColor: '#99e699' }] },
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'green' }] }, 'Paid'),
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'green' }] }, c.getPersonPaidAmountFilterd(this.state.personId, this.state.filter))),
                    React.createElement(View, { style: [styles.amountSquare, { backgroundColor: '#ffcc66' }] },
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'orangered' }] }, 'Owed'),
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'orangered' }] }, c.getPersonOwedAmountFilterd(this.state.personId, this.state.filter))),
                    React.createElement(View, { style: [styles.amountSquare, { backgroundColor: '#80b3ff' }] },
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'blue' }] }, 'Spend'),
                        React.createElement(Text, { style: [styles.amountSquareText, { color: 'blue' }] }, c.getPersonTotalAmountFilterd(this.state.personId, this.state.filter)))),
                React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, ExpenseList))));
    }
}
PersonSummary.navigationOptions = ({ navigation }) => ({
    title: 'Name: ' + c.getPerson(navigation.state.params.id).name,
});
//# sourceMappingURL=PersonSummary.js.map