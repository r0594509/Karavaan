export class PersonExpenseData {
    constructor(amount, isPaid) {
        this.amount = amount;
        this.isPaid = isPaid;
        this.isOwner = false;
        this.dateOfPayment = null;
    }
    toggleIsPaid() {
        if (!this.isPaid) {
            this.dateOfPayment = new Date();
        }
        else {
            this.dateOfPayment = null;
        }
        this.isPaid = !this.isPaid;
    }
}
//# sourceMappingURL=PersonExpenseData.js.map