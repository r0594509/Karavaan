import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";
import { Expense } from "../model/Expense";


export class Controller {

    db: TripDatabase;

    constructor() {
      this.db = TripDatabase.getInstance();
    }

    getTrips() : Trip[] {
        return this.db.getTrips();
    }

    getTrip(id: number) : Trip {
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

var c = new Controller();

export default c;
