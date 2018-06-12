"use strict";
exports.__esModule = true;
var Trip_1 = require("../model/Trip");
var Person_1 = require("../model/Person");
var Expense_1 = require("../model/Expense");
var Category_1 = require("../model/Category");
var index_1 = require("../../node_modules/ts-money/build/index");
var PersonExpenseData_1 = require("../model/PersonExpenseData");
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
        var person_1 = new Person_1.Person("jeoff");
        var person_2 = new Person_1.Person("kevin");
        var person_3 = new Person_1.Person("davlyn");
        var trip_1 = new Trip_1.Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen', index_1.Currencies.EUR, [index_1.Currencies.EUR, index_1.Currencies.USD], [person_1, person_2]);
        var trip_2 = new Trip_1.Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen', index_1.Currencies.EUR, [index_1.Currencies.EUR, index_1.Currencies.USD], [person_1, person_2, person_3]);
        var expense_1 = new Expense_1.Expense(trip_1.id, '1 Restaurant "La pizzaaa"', Category_1.Category.Food, new Date(2017, 8, 5, 0, 0), 87.99, false, index_1.Currencies.EUR);
        var expense_2 = new Expense_1.Expense(trip_1.id, '2 Cafe "Den Bozze"', Category_1.Category.Food, new Date(2017, 10, 5, 0, 0), 59.99, false, index_1.Currencies.EUR);
        var expense_3 = new Expense_1.Expense(trip_2.id, '3 Restaurant "La pizzaaa"', Category_1.Category.Food, new Date(2017, 8, 5, 0, 0), 87.99, false, index_1.Currencies.EUR);
        var expense_4 = new Expense_1.Expense(trip_2.id, '4 Cafe "Den Bozze"', Category_1.Category.Food, new Date(2017, 10, 5, 0, 0), 59.99, false, index_1.Currencies.EUR);
        this.addPerson(person_1);
        this.addPerson(person_2);
        this.addPerson(person_3);
        this.addTrip(trip_1);
        this.addTrip(trip_2);
        this.addExpense(expense_1);
        this.addExpense(expense_2);
        this.addExpense(expense_3);
        this.addExpense(expense_4);
    };
    TripDatabase.prototype.getTrips = function () {
        return this.trips;
    };
    TripDatabase.prototype.getPersons = function (tripFilter) {
        if (tripFilter === void 0) { tripFilter = null; }
        if (tripFilter == null) {
            return this.persons;
        }
        else {
            return this.getTrip(tripFilter).persons;
        }
    };
    /**
     * Look for trip that matches id
     * @return if(typeof @param id == number) then @param id will be treated as a trip's id property
     *          |   if(typeof @param id == string) then @param id will be treated as the trip's name property
     */
    TripDatabase.prototype.getTrip = function (id) {
        if (typeof id == 'number') {
            // do not use foreach
            for (var i = 0; i < this.getTrips().length; i++) {
                if (this.getTrips()[i].id === id) {
                    return this.getTrips()[i];
                }
            }
        }
        else if (typeof id == 'string') {
            for (var i = 0; i < this.getTrips().length; i++) {
                if (this.getTrips()[i].name === id) {
                    return this.getTrips()[i];
                }
            }
        }
        return null;
    };
    TripDatabase.prototype.getTripsOfPerson = function (personId, filter) {
        var trips = new Array();
        this.getTrips().forEach(function (element) {
            if (filter == "ALL" || filter === element.name) {
                element.persons.forEach(function (element2) {
                    if (element2.id === personId) {
                        trips.push(element);
                    }
                });
            }
        });
        return trips;
    };
    /**
     *
     * @param expense expense type that will be added to it's respective trip AND sets up the trip's internal hashmap.
     */
    TripDatabase.prototype.addExpense = function (expense) {
        this.getTrip(expense.tripId).addExpense(expense);
        this.populateExpenseDataMap(expense);
    };
    /**
     * Cannot import controller variable OR database instance in Expense class,
     * meaning we have to initialize list from outide the expense class...
     * No issues should happen as long as we add new expenses via the controller class OR
     * by calling a specific sequence of methods in the database class.
     */
    TripDatabase.prototype.populateExpenseDataMap = function (expense) {
        this.getTrip(expense.tripId).persons.forEach(function (element) {
            expense.expenseDataMap.set(element.id, new PersonExpenseData_1.PersonExpenseData(0, false));
        });
    };
    TripDatabase.prototype.getExpense = function (expenseId) {
        var trips = this.getTrips();
        for (var i = 0; i < trips.length; i++) {
            var trip = trips[i];
            for (var i_1 = 0; i_1 < trip.expenses.length; i_1++) {
                if (trip.expenses[i_1].id === expenseId) {
                    return trip.expenses[i_1];
                }
            }
        }
        return null;
        //    this.getTrips().forEach(element => {
        //        element.expenses.forEach(element2 => {
        //            if (element2.id === expenseId)
        //                return element2;
        //        });
        //    });
        //    return null;
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
     * Returns a number array of two elements:
     * number[0] = amount owed
     * number[1] = amount lend
     *
     * looks trough all the expenses of all the trips
     */
    TripDatabase.prototype.getPersonBalance = function (personId, filter) {
        var balance = new Array(0, 0);
        var personTrips = this.getTripsOfPerson(personId, filter);
        if (personTrips != null) {
            personTrips.forEach(function (element) {
                element.expenses.forEach(function (element2) {
                    var personExpData = element2.expenseDataMap.get(personId);
                    if (personExpData != null) {
                        if (personExpData.isPaid) {
                            balance[1] += Number(element2.expenseDataMap.get(personId).amount);
                        }
                        else {
                            balance[0] += Number(element2.expenseDataMap.get(personId).amount);
                        }
                        /*
                        if (personExpData.isOwner) {
                            balance[1] += Number(element2.expenseDataMap.get(personId).amount);
                        } else {
                            balance[0] += Number(element2.expenseDataMap.get(personId).amount);
                        }
                        */
                    }
                });
            });
        }
        //console.log(balance);
        return balance;
    };
    TripDatabase.prototype.getPersonExpenses = function (personId, filter) {
        var personTrips = this.getTripsOfPerson(personId, filter);
        var expenses = new Array();
        for (var i = 0; i < personTrips.length; i++) {
            var Trip_2 = personTrips[i];
            for (var i_2 = 0; i_2 < Trip_2.expenses.length; i_2++) {
                var expense = Trip_2.expenses[i_2];
                expenses.push(expense);
            }
        }
        return expenses;
    };
    TripDatabase.prototype.getPersonPaidAmount = function (personId, expenseId) {
        var expense = this.getExpense(expenseId);
        //console.log(expense);
        return expense.expenseDataMap.get(personId).amount;
        //return 5;
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
    TripDatabase.prototype.getPersonToPayAmountFilterd = function (personId, filter) {
        var expenses = this.getPersonExpenses(personId, filter);
        var amount = 0;
        for (var i = 0; i < expenses.length; i++) {
            var personDataMap = expenses[i].expenseDataMap.get(personId);
            if (personDataMap.isPaid === false) {
                amount = amount + personDataMap.amount;
            }
        }
        Math.round(amount * 100) / 100;
        return amount;
    };
    TripDatabase.prototype.getPersonOwedAmountFilterd = function (personId, filter) {
        var expenses = this.getPersonExpenses(personId, filter);
        var amount = 0;
        for (var i = 0; i < expenses.length; i++) {
            var personDataMap = expenses[i].expenseDataMap.get(personId);
            if (personDataMap.isOwner === true) {
                amount = amount + personDataMap.amount;
            }
        }
        Math.round(amount * 100) / 100;
        return amount;
    };
    TripDatabase.prototype.getPersonPaidAmountFilterd = function (personId, filter) {
        var expenses = this.getPersonExpenses(personId, filter);
        var amount = 0;
        for (var i = 0; i < expenses.length; i++) {
            var personDataMap = expenses[i].expenseDataMap.get(personId);
            if (personDataMap.isPaid === true) {
                amount = amount + personDataMap.amount;
            }
        }
        Math.round(amount * 100) / 100;
        return amount;
    };
    TripDatabase.prototype.getPersonTotalAmountFilterd = function (personId, filter) {
        var toPay = this.getPersonToPayAmountFilterd(personId, filter);
        var paid = this.getPersonPaidAmountFilterd(personId, filter);
        var total = toPay + paid;
        Math.round(total * 100) / 100;
        return total;
    };
    return TripDatabase;
}());
exports.TripDatabase = TripDatabase;
