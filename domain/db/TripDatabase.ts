import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";
import { Category } from "../model/Category";

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
        var expense_1 = new Expense('Restaurant "La pizzaaa"', Category.Food, new Date(2017, 8, 5, 0, 0), 87.99);
        var expense_2 = new Expense('Cafe "Den Bozze"', Category.Food, new Date(2017, 10, 5, 0, 0), 59.99);
        trip_1.addExpense(expense_1);
        trip_1.addExpense(expense_2);
        trip_2.addExpense(expense_2);
        trip_2.addExpense(expense_1);
        this.addTrip(trip_1);
        this.addTrip(trip_2);  
    }

    private addDebugPersons(){
        this.addPerson(new Person("jeoff"));
        this.addPerson(new Person("kevin"));
    }

    public getTrips() {
        return this.trips;
    }

    public getPersons(){
        return this.persons;
    }

    public getTrip(id: number) : Trip {
        // do not use foreach
        for (let i = 0; i< this.getTrips().length; i++) {
            if (this.getTrips()[i].id === id) {
                return this.getTrips()[i];
            }
        }
        return null;
    }

    public addExpenseToTrip(tripId: number, expense: Expense) {
        this.getTrip(tripId).addExpense(expense);
    }

    /**
     * 
     * @param tripId trip to show expenses from
     * @param category category to filter expenses on
     */
    public getExpensesForTrip(tripId: number, category: Category) : Expense[] {
        let tmp = new Array();
        if ( category == Category.All) {
            for (let i=0; i< this.getTrip(tripId).expenses.length; i++) {
                tmp.push(this.getTrip(tripId).expenses[i]);
            }
        } else {
            for (let i=0; i< this.getTrip(tripId).expenses.length; i++) {
                if(this.getTrip(tripId).expenses[i].category == category) {
                    tmp.push(this.getTrip(tripId).expenses[i])
                }
            }
        }
        return tmp;
    }

    public addTrip(trip: Trip) {
        this.trips.push(trip);
    }

    public addPerson(person: Person){
        this.persons.push(person);
    }

    public getPerson(personId : number) : Person {
        for (let i=0; i< this.getPersons().length; i++) {
            if (this.getPersons()[i].id === personId) {
                return this.getPersons()[i];
            }
        }
        return null;
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

    /**
     * This should also remove any trace of said person in the tips / expenses lists...
     * 
     * @param personId is always a valid tripid in the triplist
     */
    public removePerson(personId: number) {
        //
        for (let i = 0; i < this.getPersons().length; i++) {
            if (this.getPersons()[i].id === personId) {
                this.getPersons().splice(i, 1);
            }
        }
        /*
        // Remove person from trips ?
        for (let i = 0; i < this.getTrips().length; i++) {
            if (this.getTrips()[i].persons != null) {               
                for (let j = 0; j < this.getTrips()[i].persons.length; j++) {
                    if (this.getTrips()[i].persons[j].id === personId) {
                        this.getTrips()[i].persons.splice(j, 1);
                    }
                }
            }
        }
        // Remove person from trip's expenses ?
        */
    }
}