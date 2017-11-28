import { Expense } from "./Expense";

export class Trip {

    id: Number;
    name: String;
    expenses: Array<Expense>;

    constructor(name: String) {
        this.name = name;
        this.id = Date.now();
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}