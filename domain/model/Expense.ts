import { Person } from "./Person";

export class Expense {

    amount: number;
    person: Person;
    date: Date;

    constructor(date: Date, amount: number) {
        this.amount = amount;
        this.date = date;
    }

    addAmount(amount:number) {
        this.amount = amount;
    }
}