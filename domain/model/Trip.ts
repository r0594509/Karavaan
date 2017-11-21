class Trip {

    expenses: Array<Expense>

    constructor() {
    }

    addExpense(expense:Expense) {
        this.expenses.push(expense);
    }
}