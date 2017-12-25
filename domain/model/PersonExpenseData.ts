export class PersonExpenseData {
    amount: number
    isPaid: boolean

    constructor(amount: number, isPaid: boolean) {
        this.amount = amount;
        this.isPaid = isPaid;
    }
}