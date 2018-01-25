export class PersonExpenseData {
    amount: number
    isPaid: boolean
    isOwner: boolean
    dateOfPayment: Date

    constructor(amount: number, isPaid: boolean) {
        this.amount = amount;
        this.isPaid = isPaid;
        this.isOwner = false;
        this.dateOfPayment = null;
    }

    public toggleIsPaid() {

        if (!this.isPaid) {
            this.dateOfPayment = new Date();
        } else {
            this.dateOfPayment = null;
        }

        this.isPaid = !this.isPaid;
    }
}