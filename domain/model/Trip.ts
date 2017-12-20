import { Expense } from "./Expense";

export class Trip {

    id: number;
    name: string;
    description: string;
    expenses: Array<Expense>;

    /**
     * 
     * @param name cannot be empty and should contain at least 5 characters
     */
    public static isValidTripName(name: string) : boolean {
        if (name == null || name.length < 5) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param description cannot be null
     */
    public static isValidTropDescription(description: string) : boolean {
        if (description == null) {
            return false;
        }
        return true;
    }

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.expenses = new Array();
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}