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
        this.persons = new Array();
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
    /**
     * checking out varargs
     */
    Expense.prototype.addPersons = function () {
        var _this = this;
        var persons = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            persons[_i] = arguments[_i];
        }
        if (persons != null || persons.length >= 0)
            persons.forEach(function (element) { !_this.personIsInList(element) ? _this.persons.push(element) : null; });
    };
    Expense.prototype.personIsInList = function (person) {
        if (this.persons != null) {
            this.persons.forEach(function (element) {
                if (element.id === person.id) {
                    return true;
                }
            });
        }
        return false;
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
