"use strict";
exports.__esModule = true;
var Expense = /** @class */ (function () {
    function Expense(description, category, date, amount, defaultCurrency) {
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.defaultCurrency = defaultCurrency;
    }
    /**
     *
     * @param name cannot be empty and should contain at least 3 characters
     */
    Expense.isValidExpenseName = function (name) {
        return !(name == null || name.length < 3);
    };
    /**
     *
     * @param amnt cannot be empty and should be a value greater than 0
     */
    Expense.isValidExpenseAmount = function (amnt) {
        return !(amnt == null || amnt < 0);
    };
    /**
     *
     * @param date
     */
    Expense.isValidExpenseDate = function (date) {
        return !(date == null);
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
