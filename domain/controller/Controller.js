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
    Controller.prototype.getTripExpensesForPerson = function (tripId, personId) {
        return this.db.getTripExpensesForPerson(tripId, personId);
    };
    Controller.prototype.addExpenseToTrip = function (tripId, expense) {
        this.db.addExpenseToTrip(tripId, expense);
    };
    Controller.prototype.addTrip = function (trip) {
        this.db.addTrip(trip);
    };
    Controller.prototype.removeTrip = function (tripId) {
        this.db.removeTrip(tripId);
    };
    Controller.prototype.getPersons = function () {
        return this.db.getPersons();
    };
    Controller.prototype.addPerson = function (person) {
        this.db.addPerson(person);
    };
    Controller.prototype.getPerson = function (personId) {
        return this.db.getPerson(personId);
    };
    return Controller;
}());
exports.Controller = Controller;
var c = new Controller();
exports["default"] = c;
