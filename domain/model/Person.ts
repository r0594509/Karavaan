import { Expense } from "./Expense";

export class Person {

    id: number;
    name: string;
    expenses: Array<Expense>

    /**
     * 
     * @param name cannot be empty and should contain at least 3 characters
     */
    public static isValidPersonName(name: string) : boolean {
        if (name == null || name === "" ||name.length < 3) {
            return false;
        }
        return true;
    }

    constructor(name: string) {
        this.name = name;
        // need to rethink this one.......
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}