"use strict";
exports.__esModule = true;
var Expense = /** @class */ (function () {
    function Expense(owedPerson, persons, date, amount) {
        this.owedPerson = owedPerson;
        this.persons = persons;
        this.amount = amount;
        this.date = date;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }
    Expense.prototype.addAmount = function (amount) {
        this.amount = amount;
    };
    return Expense;
}());
exports.Expense = Expense;
