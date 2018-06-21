import React from 'react';
import { View } from 'react-native';
import c from '../domain/controller/Controller';
import styles from '../styles/styles';
import { TextBlock } from './TextBlock';
export class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AmountToDevide: c.getExpenseInTrip(this.props.navigation.state.params.tripId, this.props.navigation.state.params.expenseId).AmountLeftToPay(),
        };
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
    getDateToString() {
        const { params } = this.props.navigation.state;
        const expenseDate = c.getExpenseInTrip(params.tripId, params.expenseId).date;
        return dateToString = 'Expense date: ' + this.formatDate(expenseDate);
    }
    getAmountToDevideToString() {
        var amount = this.state.AmountToDevide;
        let expense = c.getExpenseInTrip(params.tripId, params.expenseId);
        var currency = expense.expenseCurrency.name;
        return 'Amount to be divided: ' + amount + currency;
    }
    render() {
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(TextBlock, { text: this.getDateToString(), isValid: true }),
                React.createElement(TextBlock, { text: '', isValid: true }))));
    }
}
ExpenseForm.navigationOptions = ({ navigation }) => ({
    title: c.getExpenseInTrip(navigation.state.params.tripId, navigation.state.params.expenseId).description,
});
//# sourceMappingURL=ExpenseForm.js.map