"use strict";
exports.__esModule = true;
var Expense = /** @class */ (function () {
    function Expense(description, owedPerson, date, amount) {
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.owedPerson = owedPerson;
        this.amount = amount;
        this.date = date;
    }
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
