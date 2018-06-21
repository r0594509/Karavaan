"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersonExpenseData = /** @class */ (function () {
    function PersonExpenseData(amount, isPaid) {
        this.amount = amount;
        this.isPaid = isPaid;
        this.isOwner = false;
        this.dateOfPayment = null;
    }
    PersonExpenseData.prototype.toggleIsPaid = function () {
        if (!this.isPaid) {
            this.dateOfPayment = new Date();
        }
        else {
            this.dateOfPayment = null;
        }
        this.isPaid = !this.isPaid;
    };
    return PersonExpenseData;
}());
exports.PersonExpenseData = PersonExpenseData;
