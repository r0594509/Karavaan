import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";

export class TripDatabase {

    trips: Array<Trip>;

    constructor() {
        this.trips = new Array<Trip>(50);
    }

    getTrips() {
        return this.trips;
    }

    getTripExpenses() : Expense {
        this.trips.forEach(element => {
            return element.expenses;
        });
        return null;
    }

    getTrip(id: number) : Trip {        
        this.trips.forEach(element => {
            if (element.id == id)
                return element;
        });
        return null;
    }

    getTripExpensesForPerson(tripId: number, personId: number) : Expense[] {

        var tmp = Array<Expense>();
        this.getTrip(tripId).expenses.forEach(element => {
            element.persons.forEach(element2 => {
                if (element2.id == personId)
                    tmp.push(element);
               });
        });
        return tmp;
    }

    getHardcodedPersons() {
        var hardcoded = [ new Person("jeoff"), new Person("keviiin") ];
        return hardcoded;
    }

    addTrip(trip: Trip) {
        this.trips.push(trip);
    }
}