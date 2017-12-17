"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
        // need to rethink this one.......
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }
    Person.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    return Person;
}());
exports.Person = Person;
