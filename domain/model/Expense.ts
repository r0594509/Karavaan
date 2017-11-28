import { Person } from "./Person";

export class Expense {

    amount: Number;
    owedPerson: Person;
    persons: Array<Person>;
    date: Date;

    constructor(owedPerson: Person, persons: Array<Person>, date: Date, amount: Number) {
        
        this.owedPerson = owedPerson;
        this.persons = persons;
        this.amount = amount;
        this.date = date;
    }

    addAmount(amount: Number) {
        this.amount = amount;
    }
}