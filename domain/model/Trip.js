"use strict";
exports.__esModule = true;
var Trip = /** @class */ (function () {
    function Trip(name, description, defaultCurrency, persons) {
        this.persons = new Array();
        this.expenses = new Array();
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.name = name;
        this.description = description;
        this.defaultCurrency = defaultCurrency;
        this.persons = persons;
    }
    /**
     *
     * @param name cannot be empty and should contain at least 2 characters
     */
    Trip.isValidTripName = function (name) {
        if (name == null || name === "" || name.length < 2) {
            return false;
        }
        return true;
    };
    /**
     *
     * @param description cannot be null
     */
    Trip.isValidTropDescription = function (description) {
        if (description == null || description === "") {
            return false;
        }
        return true;
    };
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    return Trip;
}());
exports.Trip = Trip;
