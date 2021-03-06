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
    /**
     *
     * @param dateInput Datepicker string (DD-MM-YYYY)
     */
    Expense.toDate = function (dateInput) {
        var subStr = dateInput.split("-");
        return new Date(subStr[2] + "-" + subStr[1] + "-" + subStr[0]);
    };
    Expense.formatDate = function (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    Expense.prototype.isAmountPayed = function (payed) {
        var toPayAmount = this.makeAmountDivisible();
        var payedAmount = 0;
        for (var i = 0; i < payed.length; i++) {
            payedAmount = (payedAmount * 10 + payed[i] * 10) / 10;
        }
        var result = payedAmount.toFixed(2);
        if (toPayAmount - Number(result) == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Expense.prototype.owedPerson_AmountToPay = function () {
        var _this = this;
        var subTotal = 0;
        var toPayAmount = this.makeAmountDivisible();
        /**
         * tsc compiler issue fix
         */
        this.expenseDataMap.forEach(function (element, key) {
            //if (!this.expenseDataMap.get(key).isOwner) {
            subTotal = (subTotal * 10 + _this.expenseDataMap.get(key).amount * 10) / 10;
            //}
        });
        var result = (toPayAmount - subTotal).toFixed(2);
        return Number(result);
    };
    Expense.prototype.AmountLeftToPay = function () {
        var _this = this;
        var subTotal = 0;
        var toPayAmount = this.makeAmountDivisible();
        /**
         * tsc compiler issue fix
         */
        this.expenseDataMap.forEach(function (element, key) {
            subTotal = (subTotal * 10 + _this.expenseDataMap.get(key).amount * 10) / 10;
        });
        var result = (toPayAmount - subTotal).toFixed(2);
        return Number(result);
    };
    /**
     * Devinde amount among people who are NOT owners
     */
    Expense.prototype.devideAmountEqualy = function () {
        var size = 0;
        this.expenseDataMap.forEach(function (element) {
            /*if (!element.isOwner)*/ size++;
        });
        var ToPayAmount = this.makeAmountDivisible();
        var result = (ToPayAmount / (size == 0 ? 1 : size)).toFixed(2);
        return Number(result);
    };
    Expense.prototype.makeAmountDivisible = function () {
        var toPayAmount = this.amount;
        //if(this.amount % this.expenseDataMap.size != 0){
        //    toPayAmount = toPayAmount - 0.01;
        //}
        var result = toPayAmount.toFixed(2);
        return Number(result);
    };
    Expense.prototype.isThereAnOwner = function () {
        var tempList = Array.from(this.expenseDataMap.values());
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].isOwner) {
                return true;
            }
        }
        return false;
    };
    Expense.prototype.getOwner = function () {
        var tempList = Array.from(this.expenseDataMap.entries());
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i]["1"].isOwner) {
                return tempList[i]["0"];
            }
        }
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
