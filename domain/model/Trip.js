"use strict";
exports.__esModule = true;
var Trip = /** @class */ (function () {
    function Trip(name, description) {
        this.name = name;
        this.description = description;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.expenses = new Array();
    }
    /**
     *
     * @param name cannot be empty and should contain at least 5 characters
     */
    Trip.isValidTripName = function (name) {
        if (name == null || name.length < 5) {
            return false;
        }
        return true;
    };
    /**
     *
     * @param description cannot be null
     */
    Trip.isValidTropDescription = function (description) {
        if (description == null) {
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
