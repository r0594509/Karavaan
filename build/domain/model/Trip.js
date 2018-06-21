export class Trip {
    /**
     *
     * @param name cannot be empty and should contain at least 2 characters
     */
    static isValidTripName(name) {
        if (name == null || name === "" || name.length < 2) {
            return false;
        }
        return true;
    }
    /**
     *
     * @param description cannot be null
     */
    static isValidTropDescription(description) {
        if (description == null || description === "") {
            return false;
        }
        return true;
    }
    constructor(name, description, defaultCurrency, relevantCurrencies, persons) {
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
    addExpense(expense) {
        this.expenses.push(expense);
    }
    setupRates() {
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
    }
}
//# sourceMappingURL=Trip.js.map