export class Person {
    /**
     *
     * @param name cannot be empty and should contain at least 3 characters
     */
    static isValidPersonName(name) {
        if (name == null || name === "" || name.length < 3) {
            return false;
        }
        return true;
    }
    constructor(name) {
        this.name = name;
        // need to rethink this one.......
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
    }
    addExpense(expense) {
        this.expenses.push(expense);
    }
}
//# sourceMappingURL=Person.js.map