import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";


export class Controller {

    db: TripDatabase;

    constructor() {
      this.db = new TripDatabase();
      //hardcoded Trips
      this.db.addTrip(new Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen '));
      this.db.addTrip(new Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen'));
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

let c = new Controller();

export default c;
