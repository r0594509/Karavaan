"use strict";
exports.__esModule = true;
var Trip = /** @class */ (function () {
    function Trip(name) {
        this.name = name;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    return Trip;
}());
exports.Trip = Trip;
