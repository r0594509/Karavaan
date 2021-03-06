export class Expense {
    /**
     * @param name cannot be empty and should contain at least 3 characters
     */
    static isValidExpenseName(name) {
        return !(name == null || name.length < 3);
    }
    /**
     * @param amnt cannot be empty and should be a value greater than 0
     */
    static isValidExpenseAmount(amnt) {
        return !(amnt == null || amnt < 0);
    }
    /**
     * @param date
     */
    static isValidExpenseDate(date) {
        return !(date == null);
    }
    /**
     *
     * @param dateInput Datepicker string (DD-MM-YYYY)
     */
    static toDate(dateInput) {
        let subStr = dateInput.split("-");
        return new Date(subStr[2] + "-" + subStr[1] + "-" + subStr[0]);
    }
    static formatDate(date) {
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
    }
    /**
     * Creates a new Expense with said parameters
     */
    constructor(tripId, description, category, date, amount, isDevided, expenseCurrency) {
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
    isAmountPayed(payed) {
        var toPayAmount = this.makeAmountDivisible();
        var payedAmount = 0;
        for (let i = 0; i < payed.length; i++) {
            payedAmount = (payedAmount * 10 + payed[i] * 10) / 10;
        }
        var result = payedAmount.toFixed(2);
        if (toPayAmount - Number(result) == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    owedPerson_AmountToPay() {
        var subTotal = 0;
        var toPayAmount = this.makeAmountDivisible();
        /**
         * tsc compiler issue fix
         */
        this.expenseDataMap.forEach((element, key) => {
            //if (!this.expenseDataMap.get(key).isOwner) {
            subTotal = (subTotal * 10 + this.expenseDataMap.get(key).amount * 10) / 10;
            //}
        });
        var result = (toPayAmount - subTotal).toFixed(2);
        return Number(result);
    }
    AmountLeftToPay() {
        var subTotal = 0;
        var toPayAmount = this.makeAmountDivisible();
        /**
         * tsc compiler issue fix
         */
        this.expenseDataMap.forEach((element, key) => {
            subTotal = (subTotal * 10 + this.expenseDataMap.get(key).amount * 10) / 10;
        });
        var result = (toPayAmount - subTotal).toFixed(2);
        return Number(result);
    }
    /**
     * Devinde amount among people who are NOT owners
     */
    devideAmountEqualy() {
        let size = 0;
        this.expenseDataMap.forEach(element => {
            /*if (!element.isOwner)*/ size++;
        });
        var ToPayAmount = this.makeAmountDivisible();
        var result = (ToPayAmount / (size == 0 ? 1 : size)).toFixed(2);
        return Number(result);
    }
    makeAmountDivisible() {
        var toPayAmount = this.amount;
        //if(this.amount % this.expenseDataMap.size != 0){
        //    toPayAmount = toPayAmount - 0.01;
        //}
        var result = toPayAmount.toFixed(2);
        return Number(result);
    }
}
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
//# sourceMappingURL=Expense.js.map