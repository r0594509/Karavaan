"use strict";
exports.__esModule = true;
var Expense = /** @class */ (function () {
    /**
     * Creates a new Expense with said parameters
     */
    function Expense(tripId, description, category, date, amount, isDevided, expenseCurrency) {
        this.tripId = tripId;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.expenseCurrency = expenseCurrency;
        this.isDevided = isDevided;
        this.expenseDataMap = new Map();
    }
    /**
     * @param name cannot be empty and should contain at least 3 characters
     */
    Expense.isValidExpenseName = function (name) {
        return !(name == null || name.length < 3);
    };
    /**
     * @param amnt cannot be empty and should be a value greater than 0
     */
    Expense.isValidExpenseAmount = function (amnt) {
        return !(amnt == null || amnt < 0);
    };
    /**
     * @param date
     */
    Expense.isValidExpenseDate = function (date) {
        return !(date == null);
    };
    Expense.prototype.toString = function () {
        return this.description + ", " + this.amount + " " + this.expenseCurrency.code;
    };
    return Expense;
}());
exports.Expense = Expense;
/**
     *  @deprecated after domain refactoring
     *  checking out varargs
     *
    public addPersons(...persons : Person[]) {
        if(persons!=null||persons.length>=0)
        persons.forEach(element=>{!this.personIsInList(element)?this.persons.push(element):null;});
    }

    private personIsInList(person: Person) : boolean {
        if (this.persons != null) {
            this.persons.forEach(element => {
                if (element.id === person.id) {
                    return true;
                }
            });
        }
        return false;
    }
    */ 
