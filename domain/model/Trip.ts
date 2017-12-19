import { Expense } from "./Expense";

export class Trip {

    id: number;
    name: string;
    description: string;
    expenses: Array<Expense>;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}