import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";
import { Expense } from "../model/Expense";


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

    public getTripExpensesForPerson(tripId: number, personId: number) {
        return this.db.getTripExpensesForPerson(tripId, personId);
    }

    public addTrip(trip: Trip) {
        this.db.addTrip(trip);
    }

    public removeTrip(tripId: number) {
        this.db.removeTrip(tripId);
    }

    public getPersonsInTrip(tripId: number) {
        return this.db.getPersons();
    }

    public addPerson(person: Person) {
        this.db.addPerson(person);
    }
}

var c = new Controller();

export default c;
