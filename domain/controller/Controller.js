"use strict";
exports.__esModule = true;
var TripDatabase_1 = require("../db/TripDatabase");
var Controller = /** @class */ (function () {
    function Controller() {
        this.db = TripDatabase_1.TripDatabase.getInstance();
    }
    Controller.prototype.getTrips = function () {
        return this.db.getTrips();
    };
    Controller.prototype.getTrip = function (id) {
        return this.db.getTrip(id);
    };
    Controller.prototype.getTripsOfPerson = function (personId, filter) {
        return this.db.getTripsOfPerson(personId, filter);
    };
    Controller.prototype.addExpense = function (expense) {
        this.db.addExpense(expense);
    };
    Controller.prototype.getExpense = function (expenseId) {
        return this.db.getExpense(expenseId);
    };
    Controller.prototype.getExpenseInTrip = function (tripId, expenseId) {
        return this.db.getExpenseInTrip(tripId, expenseId);
    };
    Controller.prototype.removeExpenseInTrip = function (tripId, expenseId) {
        this.db.removeExpenseInTrip(tripId, expenseId);
    };
    Controller.prototype.getExpensesForTrip = function (tripId, category) {
        return this.db.getExpensesForTrip(tripId, category);
    };
    Controller.prototype.addTrip = function (trip) {
        this.db.addTrip(trip);
    };
    Controller.prototype.removeTrip = function (tripId) {
        this.db.removeTrip(tripId);
    };
    Controller.prototype.removePerson = function (personId) {
        this.db.removePerson(personId);
    };
    Controller.prototype.getPersons = function (tripFilter) {
        if (tripFilter === void 0) { tripFilter = null; }
        return this.db.getPersons(tripFilter);
    };
    Controller.prototype.addPerson = function (person) {
        this.db.addPerson(person);
    };
    Controller.prototype.getPerson = function (personId) {
        return this.db.getPerson(personId);
    };
    Controller.prototype.getPersonBalance = function (personId, filter) {
        return this.db.getPersonBalance(personId, filter);
    };
    return Controller;
}());
exports.Controller = Controller;
var c = new Controller();
exports["default"] = c;
