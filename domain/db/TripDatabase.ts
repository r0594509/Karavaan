import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";

export class TripDatabase {

    trips: Array<Trip>;

    constructor() {

    }

    getTrips() {
        return this.trips;
    }

    getTripExpenses() {
        this.trips.forEach(element => {
            return element.expenses;
        });
        return null;
    }

    getTrip(id: number) {        
        this.trips.forEach(element => {
            if (element.id == id)
                return element;
        });
        return null;
    }

    getTripExpensesForPerson(tripId: number, personId: number) {

        var tmp = Array<Expense>();
        this.getTrip(tripId).expenses.forEach(element => {
            element.persons.forEach(element2 => {
                if (element2.id == personId)
                    tmp.push(element);
               });
        });
        return null;
    }

    addTrip(trip: Trip) {
        this.trips.push(trip);
    }
}