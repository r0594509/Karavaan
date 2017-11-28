import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";

export class TripDatabase {

    trips: Array<Trip>;


    getTrips() {
        return this.trips;
    }

    getTripExpenses() {
        this.trips.forEach(element => {
            return element.expenses;
        });
    }

    getTrip(id: Number) {
        this.trips.forEach(element => {
            if (element.id == id)
                return element;
        });
    }

    getTripExpensesForPerson(trip: Trip ,person: Person) {
        var tmp = Array<Expense>();        
        trip.expenses.forEach(element => {
            element.persons.forEach(element2 => {
                if (element2 == person)
                    tmp.push(element);
               });
        });
    }

    addTrip(trip: Trip) {
        this.trips.push(trip);
    }
}