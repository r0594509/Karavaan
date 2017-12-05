import { Person } from "./Person";

export class Expense {

    amount: number;
    owedPerson: Person;
    persons: Array<Person>;
    date: Date;
    id: number;

    constructor(owedPerson: Person, persons: Array<Person>, date: Date, amount: number) {
        
        this.owedPerson = owedPerson;
        this.persons = persons;
        this.amount = amount;
        this.date = date;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }

    addAmount(amount: number) {
        this.amount = amount;
    }
}