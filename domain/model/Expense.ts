import { Person } from "./Person";

export class Expense {

    description: string;
    amount: number;
    owedPerson: Person;
    persons: Array<Person>;
    date: Date;
    id: number;

    constructor(description: string, owedPerson: Person, date: Date, amount: number ) {
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.owedPerson = owedPerson;
        this.amount = amount;
        this.date  = date;

    }    

    addPersons(persons : Array<Person>){
        this.persons = persons;
    }

    addAmount(amount: number) {
        this.amount = amount;
    }

    toString(): string {
        return 
    }
}