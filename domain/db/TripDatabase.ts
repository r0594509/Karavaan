import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";

export class TripDatabase {


    private trips: Trip[];
    private persons: Person[];
    private static _instance: TripDatabase;

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        this.trips = new Array();
        this.persons = new Array();
        this.addDebugTrips();
        this.addDebugPersons();
    }

    private addDebugTrips() {
        var trip_1 = new Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen ');
        var trip_2 = new Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen');
        var expense_1 = new Expense('Restaurant "La pizzaaa"', new Person('Jef'), new Date(2017, 8, 5, 0, 0), 87.99);
        var expense_2 = new Expense('Cafe "Den Bozze"', new Person('Janick'), new Date(2017, 10, 5, 0, 0), 59.99);
        trip_1.addExpense(expense_1);
        trip_1.addExpense(expense_2);
        trip_2.addExpense(expense_2);
        trip_2.addExpense(expense_1);
        this.addTrip(trip_1);
        this.addTrip(trip_2);  
    }

    private addDebugPersons(){
        this.addPerson(new Person("jeoff"));
        this.addPerson( new Person("kevin"));
    }

    getTrips() {
        return this.trips;
    }

    getPersons(){
        return this.persons;
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

    addPerson(person: Person){
        this.persons.push(person);
    }

    /**
     * @param tripId is always a valid tripid in the triplist
     */
    public removeTrip(tripId : number) {
        for (let i = 0; i < this.getTrips().length; i++) {
            if (this.getTrips()[i].id === tripId) {
                this.getTrips().splice(i, 1);
            }
        }
    }
}