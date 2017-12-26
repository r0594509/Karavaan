export class PersonExpenseData {
    amount: number
    isPaid: boolean
    isOwner: boolean

    constructor(amount: number, isPaid: boolean) {
        this.amount = amount;
        this.isPaid = isPaid;
        this.isOwner = false;
    }
}