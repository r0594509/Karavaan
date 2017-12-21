import { Person } from "./Person";

export class Expense {

    description: string;
    amount: number;
    owedPerson: Person;
    persons: Array<Person>;
    date: Date;
    id: number;

    /**
     * 
     * @param name cannot be empty and should contain at least 3 characters
     */
    public static isValidExpenseName(name: string) : boolean {
        if (name == null || name === "" ||name.length < 3) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param amnt cannot be empty and should be a value greater than 0
     */
    public static isValidExpenseAmount(amnt: number) : boolean {
        if (amnt == null || amnt < 0) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param date 
     */
    public static isValidExpenseDate(date: Date) : boolean {
        if (date == null) {
            return false;
        }
        return true;
    }

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