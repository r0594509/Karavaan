"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trip = /** @class */ (function () {
    function Trip(name, description, defaultCurrency, relevantCurrencies, persons) {
        this.persons = new Array();
        this.expenses = new Array();
        this.relevantCurrencies = new Array();
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.name = name;
        this.description = description;
        this.defaultCurrency = defaultCurrency;
        this.relevantCurrencies = relevantCurrencies;
        this.persons = persons;
        this.setupRates();
    }
    /**
     *
     * @param name cannot be empty and should contain at least 2 characters
     */
    Trip.isValidTripName = function (name) {
        if (name == null || name === "" || name.length < 2) {
            return false;
        }
        return true;
    };
    /**
     *
     * @param description cannot be null
     */
    Trip.isValidTropDescription = function (description) {
        if (description == null || description === "") {
            return false;
        }
        return true;
    };
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    Trip.prototype.setupRates = function () {
        // with BASE = euro
        this.rates = {
            "EUR": 1,
            "USD": 1.16,
            "CAD": 1.54,
            "BTC": 0.00017,
            "AED": 4.27,
            "AFN": 83.22,
            "AMD": 560.45,
            "ARS": 31.99,
            "AUD": 1.57,
        };
    };
    return Trip;
}());
exports.Trip = Trip;
