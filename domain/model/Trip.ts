import { Expense } from "./Expense";
import { Person } from "./Person";
import { Money, Currencies, Currency } from '../../node_modules/ts-money/build/index';

export class Trip {

    id: number;
    name: string;
    description: string;
    defaultCurrency: Currency;
    relevantCurrencies: Array<Currency>;
    expenses: Array<Expense>;
    persons: Array<Person>;
    rates: {};

    /**
     * 
     * @param name cannot be empty and should contain at least 2 characters
     */
    public static isValidTripName(name: string) : boolean {
        if (name == null || name === "" ||name.length < 2) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param description cannot be null
     */
    public static isValidTropDescription(description: string) : boolean {
        if (description == null || description === "") {
            return false;
        }
        return true;
    }

    constructor(name: string, description: string, defaultCurrency: Currency, relevantCurrencies: Array<Currency>, persons : Array<Person>) {
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

    public addExpense(expense: Expense) {
        this.expenses.push(expense);
    }

    private setupRates() {
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
        }
    }
}