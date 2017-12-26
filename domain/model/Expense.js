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
    Expense.prototype.isAmountPayed = function (payed) {
        var toPayAmount = this.makeAmountDivisible();
        var payedAmount = 0;
        for (var i = 0; i < payed.length; i++) {
            payedAmount += payed[i];
        }
        if (toPayAmount - payedAmount == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Expense.prototype.AmountLeftToPay = function () {
        var subTotal = 0;
        for (var k in this.expenseDataMap.keys) {
            subTotal += this.expenseDataMap.get(Number(k)).amount;
        }
        return subTotal;
    };
    Expense.prototype.devideAmountEqualy = function () {
        var ToPayAmount = this.makeAmountDivisible();
        return ToPayAmount / this.expenseDataMap.size;
    };
    Expense.prototype.makeAmountDivisible = function () {
        var toPayAmount = this.amount;
        if (this.amount % this.expenseDataMap.size != 0) {
            toPayAmount = toPayAmount - 0.01;
        }
        return toPayAmount;
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
