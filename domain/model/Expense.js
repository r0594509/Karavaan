"use strict";
exports.__esModule = true;
//import { Money, Currencies }  from 'ts-money';
var Expense = /** @class */ (function () {
    function Expense(description, category, date, amount) {
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }
    /**
     *
     * @param name cannot be empty and should contain at least 3 characters
     */
    Expense.isValidExpenseName = function (name) {
        if (name == null || name === "" || name.length < 3) {
            return false;
        }
        return true;
    };
    /**
     *
     * @param amnt cannot be empty and should be a value greater than 0
     */
    Expense.isValidExpenseAmount = function (amnt) {
        if (amnt == null || amnt < 0) {
            return false;
        }
        return true;
    };
    /**
     *
     * @param date
     */
    Expense.isValidExpenseDate = function (date) {
        if (date == null) {
            return false;
        }
        return true;
    };
    Expense.prototype.addPersons = function (persons) {
        this.persons = persons;
    };
    Expense.prototype.addAmount = function (amount) {
        this.amount = amount;
    };
    Expense.prototype.toString = function () {
        return;
    };
    return Expense;
}());
exports.Expense = Expense;
