"use strict";
exports.__esModule = true;
var Trip_1 = require("../model/Trip");
var Person_1 = require("../model/Person");
var Expense_1 = require("../model/Expense");
var TripDatabase = /** @class */ (function () {
    function TripDatabase() {
        this.trips = new Array();
        this.persons = new Array();
        this.addDebugTrips();
        this.addDebugPersons();
    }
    TripDatabase.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    TripDatabase.prototype.addDebugTrips = function () {
        var trip_1 = new Trip_1.Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen ');
        var trip_2 = new Trip_1.Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen');
        var expense_1 = new Expense_1.Expense('Restaurant "La pizzaaa"', new Person_1.Person('Jef'), new Date(2017, 8, 5, 0, 0), 87.99);
        var expense_2 = new Expense_1.Expense('Cafe "Den Bozze"', new Person_1.Person('Janick'), new Date(2017, 10, 5, 0, 0), 59.99);
        trip_1.addExpense(expense_1);
        trip_1.addExpense(expense_2);
        trip_2.addExpense(expense_2);
        trip_2.addExpense(expense_1);
        this.addTrip(trip_1);
        this.addTrip(trip_2);
    };
    TripDatabase.prototype.addDebugPersons = function () {
        this.addPerson(new Person_1.Person("jeoff"));
        this.addPerson(new Person_1.Person("kevin"));
    };
    TripDatabase.prototype.getTrips = function () {
        return this.trips;
    };
    TripDatabase.prototype.getPersons = function () {
        return this.persons;
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
    TripDatabase.prototype.addTrip = function (trip) {
        this.trips.push(trip);
    };
    TripDatabase.prototype.addPerson = function (person) {
        this.persons.push(person);
    };
    /**
     * @param tripId is always a valid tripid in the triplist
     */
    TripDatabase.prototype.removeTrip = function (tripId) {
        for (var i = 0; i < this.getTrips().length; i++) {
            if (this.getTrips()[i].id === tripId) {
                this.getTrips().splice(i, 1);
            }
        }
    };
    return TripDatabase;
}());
exports.TripDatabase = TripDatabase;
