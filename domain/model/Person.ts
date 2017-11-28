import { Expense } from "./Expense";

export class Person {

    name: String;
    expenses: Array<Expense>

    constructor(name: String) {
        this.name = name;
    }

    addExpense(expense:Expense) {
        this.expenses.push(expense);
    }
}