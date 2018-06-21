"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
        // need to rethink this one.......
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }
    /**
     *
     * @param name cannot be empty and should contain at least 3 characters
     */
    Person.isValidPersonName = function (name) {
        if (name == null || name === "" || name.length < 3) {
            return false;
        }
        return true;
    };
    Person.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    return Person;
}());
exports.Person = Person;
