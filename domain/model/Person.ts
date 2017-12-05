import { Expense } from "./Expense";

export class Person {

    id: number;
    name: string;
    expenses: Array<Expense>

    constructor(name: string) {
        this.name = name;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
    }
}