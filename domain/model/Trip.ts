import { Expense } from "./Expense";
import { Person } from "./Person";

export class Trip {

    id: number;
    name: string;
    description: string;
    expenses: Array<Expense>;
    persons: Array<Person>;

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

    constructor(name: string, description: string, persons : Array<Person>) {
        this.persons = new Array();
        this.expenses = new Array();

        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.name = name;
        this.description = description;
        this.persons = persons;
    }

    public addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}