import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";

export class TripDatabase {


    private trips: Trip[];
    private static _instance: TripDatabase;

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        this.trips = new Array();
        this.addDebugTrips();
    }

    private addDebugTrips() {
        this.addTrip(new Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen '));
        this.addTrip(new Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen'));  
    }

    getTrips() {
        return this.trips;
    }

    getTrip(id: number) : Trip {
        // do not use foreach
        for (let i = 0; i< this.getTrips().length; i++) {
            if (this.getTrips()[i].id === id) {
                return this.getTrips()[i];
            }
        }
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