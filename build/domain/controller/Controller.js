import { TripDatabase } from "../db/TripDatabase";
import { Currencies } from 'ts-money';
export class Controller {
    constructor() {
        this.db = TripDatabase.getInstance();
    }
    getTrips() {
        return this.db.getTrips();
    }
    getTrip(id) {
        return this.db.getTrip(id);
    }
    getTripsOfPerson(personId, filter) {
        return this.db.getTripsOfPerson(personId, filter);
    }
    addExpense(expense) {
        this.db.addExpense(expense);
    }
    getExpense(expenseId) {
        return this.db.getExpense(expenseId);
    }
    getExpenseInTrip(tripId, expenseId) {
        return this.db.getExpenseInTrip(tripId, expenseId);
    }
    removeExpenseInTrip(tripId, expenseId) {
        this.db.removeExpenseInTrip(tripId, expenseId);
    }
    getExpensesForTrip(tripId, category) {
        return this.db.getExpensesForTrip(tripId, category);
    }
    addTrip(trip) {
        this.db.addTrip(trip);
    }
    removeTrip(tripId) {
        this.db.removeTrip(tripId);
    }
    removePerson(personId) {
        this.db.removePerson(personId);
    }
    getPersons(tripFilter = null) {
        return this.db.getPersons(tripFilter);
    }
    addPerson(person) {
        this.db.addPerson(person);
    }
    getPerson(personId) {
        return this.db.getPerson(personId);
    }
    getPersonBalance(personId, filter) {
        return this.db.getPersonBalance(personId, filter);
    }
    getPersonExpenses(personId, filter) {
        return this.db.getPersonExpenses(personId, filter);
    }
    getPersonPaidAmount(personId, expenseId) {
        return this.db.getPersonPaidAmount(personId, expenseId);
    }
    getPersonToPayAmountFilterd(personId, filter) {
        return this.db.getPersonToPayAmountFilterd(personId, filter);
    }
    getPersonOwedAmountFilterd(personId, filter) {
        return this.db.getPersonOwedAmountFilterd(personId, filter);
    }
    getPersonPaidAmountFilterd(personId, filter) {
        return this.db.getPersonPaidAmountFilterd(personId, filter);
    }
    getPersonTotalAmountFilterd(personId, filter) {
        return this.db.getPersonTotalAmountFilterd(personId, filter);
    }
    getTenMostPopularCurrencies() {
        let currenciesList = [];
        let counter = 0;
        for (var n in Currencies) {
            if (Currencies[n].code != "ALL") {
                currenciesList.push({ value: n });
            }
            counter++;
            if (counter == 10) {
                return currenciesList;
            }
        }
    }
}
var c = new Controller();
export default c;
//# sourceMappingURL=Controller.js.map