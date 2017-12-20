"use strict";
exports.__esModule = true;
var Trip = /** @class */ (function () {
    function Trip(name, description) {
        this.name = name;
        this.description = description;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.expenses = new Array();
    }
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    return Trip;
}());
exports.Trip = Trip;
