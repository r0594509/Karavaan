import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";
import { Expense } from "../model/Expense";
import { Category } from '../model/Category';

export class Controller {

    db: TripDatabase;

    constructor() {
      this.db = TripDatabase.getInstance();
    }

    public getTrips() : Trip[] {
        return this.db.getTrips();
    }

    public getTrip(id: number) : Trip {
        return this.db.getTrip(id);
    }

    public getTripsOfPerson(personId: number): Trip[] {
        return this.db.getTripsOfPerosn(personId);
    }

    public addExpense(expense: Expense) {
        this.db.addExpense(expense);
    }

    public getExpense(expenseId: number) : Expense {
        return this.db.getExpense(expenseId);
    }

    public getExpenseInTrip(tripId: number, expenseId: number) : Expense {
        return this.db.getExpenseInTrip(tripId, expenseId);
    }

    public removeExpenseInTrip(tripId: number, expenseId: number) {
        this.db.removeExpenseInTrip(tripId, expenseId);
    }

    public getExpensesForTrip(tripId: number, category: Category) : Expense[] {
        return this.db.getExpensesForTrip(tripId, category);
    }

    public addTrip(trip: Trip) {
        this.db.addTrip(trip);
    }

    public removeTrip(tripId: number) {
        this.db.removeTrip(tripId);
    }

    public removePerson(personId: number) {
        this.db.removePerson(personId);
    }

    public getPersons() {
        return this.db.getPersons();
    }

    public addPerson(person: Person) {
        this.db.addPerson(person);
    }

    public getPerson(personId: number) {
        return this.db.getPerson(personId);
    }

    public getPersonBalance(personId: number): number[] {
        return this.db.getPersonBalance(personId);
    }
}

var c = new Controller();
export default c;