import { Expense } from "./Expense";

export class Person {

    name: string;
    expenses: Array<Expense>

    constructor(name: string) {
        this.name = name;
    }

    addExpense(expense:Expense) {
        this.expenses.push(expense);
    }
}