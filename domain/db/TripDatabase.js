"use strict";
exports.__esModule = true;
var Trip_1 = require("../model/Trip");
var Person_1 = require("../model/Person");
var Expense_1 = require("../model/Expense");
var Category_1 = require("../model/Category");
var index_1 = require("../../node_modules/ts-money/build/index");
var TripDatabase = /** @class */ (function () {
    function TripDatabase() {
        this.trips = new Array();
        this.persons = new Array();
        this.addDebugInfo();
    }
    TripDatabase.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    TripDatabase.prototype.addDebugInfo = function () {
        var trip_1 = new Trip_1.Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen ');
        var trip_2 = new Trip_1.Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen');
        var expense_1 = new Expense_1.Expense('Restaurant "La pizzaaa"', Category_1.Category.Food, new Date(2017, 8, 5, 0, 0), 87.99, index_1.Currencies.EUR);
        var expense_2 = new Expense_1.Expense('Cafe "Den Bozze"', Category_1.Category.Food, new Date(2017, 10, 5, 0, 0), 59.99, index_1.Currencies.EUR);
        var person_1 = new Person_1.Person("jeoff");
        var person_2 = new Person_1.Person("kevin");
        expense_1.addPersons();
        expense_1.addPersons(person_1, person_2);
        expense_2.addPersons(person_1);
        trip_1.addExpense(expense_1);
        trip_1.addExpense(expense_2);
        trip_2.addExpense(expense_2);
        trip_2.addExpense(expense_1);
        this.addTrip(trip_1);
        this.addTrip(trip_2);
        this.addPerson(person_1);
        this.addPerson(person_2);
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
    TripDatabase.prototype.addExpenseToTrip = function (tripId, expense) {
        this.getTrip(tripId).addExpense(expense);
    };
    TripDatabase.prototype.getExpenseInTrip = function (tripId, expenseId) {
        for (var i = 0; i < this.getTrip(tripId).expenses.length; i++) {
            if (this.getTrip(tripId).expenses[i].id === expenseId) {
                return this.getTrip(tripId).expenses[i];
            }
        }
        return null;
    };
    TripDatabase.prototype.removeExpenseInTrip = function (tripId, expenseId) {
        for (var i = 0; i < this.getTrip(tripId).expenses.length; i++) {
            if (this.getTrip(tripId).expenses[i].id === expenseId) {
                this.getTrip(tripId).expenses.splice(i, 1);
            }
        }
    };
    /**
     *
     * @param tripId trip to show expenses from
     * @param category category to filter expenses on
     */
    TripDatabase.prototype.getExpensesForTrip = function (tripId, category) {
        var tmp = new Array();
        if (category == Category_1.Category.All) {
            for (var i = 0; i < this.getTrip(tripId).expenses.length; i++) {
                tmp.push(this.getTrip(tripId).expenses[i]);
            }
        }
        else {
            for (var i = 0; i < this.getTrip(tripId).expenses.length; i++) {
                if (this.getTrip(tripId).expenses[i].category == category) {
                    tmp.push(this.getTrip(tripId).expenses[i]);
                }
            }
        }
        return tmp;
    };
    TripDatabase.prototype.addTrip = function (trip) {
        this.trips.push(trip);
    };
    TripDatabase.prototype.addPerson = function (person) {
        this.persons.push(person);
    };
    TripDatabase.prototype.getPerson = function (personId) {
        for (var i = 0; i < this.getPersons().length; i++) {
            if (this.getPersons()[i].id === personId) {
                return this.getPersons()[i];
            }
        }
        return null;
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
    /**
     * This should also remove any trace of said person in the tips / expenses lists...
     *
     * @param personId is always a valid tripid in the triplist
     */
    TripDatabase.prototype.removePerson = function (personId) {
        //
        for (var i = 0; i < this.getPersons().length; i++) {
            if (this.getPersons()[i].id === personId) {
                this.getPersons().splice(i, 1);
            }
        }
        /*
        // Remove person from trips ?
        for (let i = 0; i < this.getTrips().length; i++) {
            if (this.getTrips()[i].persons != null) {
                for (let j = 0; j < this.getTrips()[i].persons.length; j++) {
                    if (this.getTrips()[i].persons[j].id === personId) {
                        this.getTrips()[i].persons.splice(j, 1);
                    }
                }
            }
        }
        // Remove person from trip's expenses ?
        */
    };
    return TripDatabase;
}());
exports.TripDatabase = TripDatabase;
