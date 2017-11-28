import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";


export class Controller {

    db: TripDatabase;

    getTrips() {
        this.db.getTrips();
    }

    getTripExpenses() {
        this.db.getTripExpenses();
    }

    getTrip(id: Number) {
        this.db.getTrip(id);
    }

    gettripExpensesForPerson(trip: Trip, person: Person) {
        this.db.getTripExpensesForPerson(trip, person);
    }

    addTrip(trip: Trip) {
        this.db.addTrip(trip);
    }
}