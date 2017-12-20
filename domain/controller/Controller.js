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
    Controller.prototype.addTrip = function (trip) {
        this.db.addTrip(trip);
    };
    Controller.prototype.getPersonsInTrip = function (tripId) {
        return this.db.getHardcodedPersons();
    };
    return Controller;
}());
exports.Controller = Controller;
var c = new Controller();
exports["default"] = c;
