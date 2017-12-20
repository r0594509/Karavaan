"use strict";
exports.__esModule = true;
var Trip_1 = require("../model/Trip");
var Person_1 = require("../model/Person");
var TripDatabase = /** @class */ (function () {
    function TripDatabase() {
        this.trips = new Array();
        this.addDebugTrips();
    }
    TripDatabase.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    TripDatabase.prototype.addDebugTrips = function () {
        this.addTrip(new Trip_1.Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen '));
        this.addTrip(new Trip_1.Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen'));
    };
    TripDatabase.prototype.getTrips = function () {
        return this.trips;
    };
    TripDatabase.prototype.getTrip = function (id) {
        // do not use foreach
        for (var i = 0; i < this.getTrips().length; i++) {
            if (this.getTrips()[i].id === id) {
                return this.getTrips()[i];
            }
        }
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
