"use strict";
exports.__esModule = true;
var Person_1 = require("../model/Person");
var TripDatabase = /** @class */ (function () {
    function TripDatabase() {
        this.trips = new Array(50);
    }
    TripDatabase.prototype.getTrips = function () {
        return this.trips;
    };
    TripDatabase.prototype.getTripExpenses = function () {
        this.trips.forEach(function (element) {
            return element.expenses;
        });
        return null;
    };
    TripDatabase.prototype.getTrip = function (id) {
        this.trips.forEach(function (element) {
            if (element.id == id)
                return element;
        });
        return null;
    };
    TripDatabase.prototype.getTripExpensesForPerson = function (tripId, personId) {
        var tmp = Array();
        this.getTrip(tripId).expenses.forEach(function (element) {
            element.persons.forEach(function (element2) {
                if (element2.id == personId)
                    tmp.push(element);
            });
        });
        return tmp;
    };
    TripDatabase.prototype.getHardcodedPersons = function () {
        var hardcoded = [new Person_1.Person("jeoff"), new Person_1.Person("keviiin")];
        return hardcoded;
    };
    TripDatabase.prototype.addTrip = function (trip) {
        this.trips.push(trip);
    };
    return TripDatabase;
}());
exports.TripDatabase = TripDatabase;
