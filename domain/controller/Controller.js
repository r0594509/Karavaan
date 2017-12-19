"use strict";
exports.__esModule = true;
var TripDatabase_1 = require("../db/TripDatabase");
var Trip_1 = require("../model/Trip");
var Controller = /** @class */ (function () {
    function Controller() {
        this.db = new TripDatabase_1.TripDatabase();
        //hardcoded Trips
        this.db.addTrip(new Trip_1.Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen '));
        this.db.addTrip(new Trip_1.Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen'));
    }
    Controller.prototype.getTrips = function () {
        return this.db.getTrips();
    };
    Controller.prototype.getTripExpenses = function () {
        return this.db.getTripExpenses();
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
