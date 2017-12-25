import { Trip } from "../model/Trip";
import { Person } from "../model/Person";
import { Expense } from "../model/Expense";
import { Category } from "../model/Category";
import { Currencies } from "../../node_modules/ts-money/build/index";
import { PersonExpenseData } from "../model/PersonExpenseData";

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
        this.addDebugInfo();
    }

    private addDebugInfo() {
        var person_1 = new Person("jeoff");
        var person_2 = new Person("kevin");
        var person_3 = new Person("davlyn");
        var trip_1 = new Trip('Belgium RoadTrip', 'Een Road-Trip door Belgie startende bij Antwerpen-Brussel-Leuven-Luik-Namen', Currencies.EUR, [person_1, person_2]);
        var trip_2 = new Trip('Madrid CityTrip', 'Een dag trip door Madrid met vrienden. Bezoeke van bekende toeristische plaatsen', Currencies.EUR, [person_1, person_2, person_3]);
        var expense_1 = new Expense(trip_1.id, '1 Restaurant "La pizzaaa"', Category.Food, new Date(2017, 8, 5, 0, 0), 87.99, true, Currencies.EUR);
        var expense_2 = new Expense(trip_1.id,'2 Cafe "Den Bozze"', Category.Food, new Date(2017, 10, 5, 0, 0), 59.99, true, Currencies.EUR);
        var expense_3 = new Expense(trip_2.id, '3 Restaurant "La pizzaaa"', Category.Food, new Date(2017, 8, 5, 0, 0), 87.99, true, Currencies.EUR);
        var expense_4 = new Expense(trip_2.id,'4 Cafe "Den Bozze"', Category.Food, new Date(2017, 10, 5, 0, 0), 59.99, true, Currencies.EUR);
        
        this.addTrip(trip_1);
        this.addTrip(trip_2);
        this.addPerson(person_1);
        this.addPerson(person_2);
        this.addPerson(person_3);
        this.addExpense(expense_1);
        this.addExpense(expense_2);
        this.addExpense(expense_3);
        this.addExpense(expense_4);

        //console.log(this.trips);
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

    /**
     * 
     * @param expense expense type that will be added to it's respective trip AND sets up the trip's internal hashmap.
     */
    public addExpense(expense: Expense) {
        this.getTrip(expense.tripId).addExpense(expense);
        this.populateExpenseDataMap(expense);
    }

    /**
     * Cannot import controller variable OR database instance in Expense class,
     * meaning we have to initialize list from outide the expense class...
     * No issues should happen as long as we add new expenses via the controller class OR
     * by calling a specific sequence of methods in the database class.
     */
    private populateExpenseDataMap(expense: Expense) {
        this.getTrip(expense.tripId).persons.forEach(element => {
            expense.expenseDataMap.set(element.id, new PersonExpenseData(0, false)); 
        });
    }

    public getExpense(expenseId: number) : Expense {
        this.getTrips().forEach(element => {
            element.expenses.forEach(element2 => {
                if (element2.id === expenseId)
                    return element2;
            });
        });
        return null;
    }

    public getExpenseInTrip(tripId: number, expenseId: number) : Expense {
        for (let i=0; i < this.getTrip(tripId).expenses.length; i++) {
            if (this.getTrip(tripId).expenses[i].id === expenseId) {
                return this.getTrip(tripId).expenses[i];
            }
        }
        return null;
    }

    public removeExpenseInTrip(tripId: number, expenseId: number) {
        for (let i=0; i < this.getTrip(tripId).expenses.length; i++) {
            if (this.getTrip(tripId).expenses[i].id === expenseId) {
                this.getTrip(tripId).expenses.splice(i, 1);
            }
        }
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