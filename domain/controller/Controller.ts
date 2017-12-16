import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";


export class Controller {

    db: TripDatabase;

    constructor() {
      this.db = new TripDatabase();
    }

    getTrips() {
        return this.db.getTrips();
    }

    getTripExpenses() {
        return this.db.getTripExpenses();
    }

    getTrip(id: number) {
        return this.db.getTrip(id);
    }

    getTripExpensesForPerson(tripId: number, personId: number) {
        return this.db.getTripExpensesForPerson(tripId, personId);
    }

    addTrip(trip: Trip) {
        this.db.addTrip(trip);
    }

    getPersonsInTrip(tripId: number) {
        return this.db.getHardcodedPersons();
    }
}