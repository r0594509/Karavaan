import { TripDatabase } from "../db/TripDatabase";
import { Person } from "../model/Person";
import { Trip } from "../model/Trip";
import { Expense } from "../model/Expense";
import { Category } from '../model/Category';
import { Money, Currencies, Currency } from 'ts-money';

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

    public getTripsOfPerson(personId: number, filter: string): Trip[] {
        return this.db.getTripsOfPerson(personId, filter);
    }

    public addExpense(expense: Expense) {
        this.db.addExpense(expense);
    }

    public getExpense(expenseId: number) : Expense {
        return this.db.getExpense(expenseId);
    }

    public getExpenseInTrip(tripId: number, expenseId: number) : Expense {
        return this.db.getExpenseInTrip(tripId, expenseId);
    }

    public removeExpenseInTrip(tripId: number, expenseId: number) {
        this.db.removeExpenseInTrip(tripId, expenseId);
    }

    public getExpensesForTrip(tripId: number, category: Category) : Expense[] {
        return this.db.getExpensesForTrip(tripId, category);
    }

    public addTrip(trip: Trip) {
        this.db.addTrip(trip);
    }

    public removeTrip(tripId: number) {
        this.db.removeTrip(tripId);
    }

    public removePerson(personId: number) {
        this.db.removePerson(personId);
    }

    public getPersons(tripFilter: string = null) {
        return this.db.getPersons(tripFilter);
    }

    public addPerson(person: Person) {
        this.db.addPerson(person);
    }

    public getPerson(personId: number) {
        return this.db.getPerson(personId);
    }

    public getPersonBalance(personId: number, filter: string): number[] {
        return this.db.getPersonBalance(personId, filter);
    }

    public getPersonExpenses(personId: number, filter: string): Expense[] {
        return this.db.getPersonExpenses(personId, filter);
    }

    public getPersonPaidAmount(personId: number, expenseId: number): number{
         return this.db.getPersonPaidAmount(personId, expenseId);
    }

    public getPersonToPayAmountFilterd(personId: number, filter: string): number{
        return this.db.getPersonToPayAmountFilterd(personId, filter);
    }

    public getPersonOwedAmountFilterd(personId: number, filter: string): number{
        return this.db.getPersonOwedAmountFilterd(personId, filter);
    }

    public getPersonPaidAmountFilterd(personId: number, filter: string): number{
        return this.db.getPersonPaidAmountFilterd(personId, filter);
    }

    public getPersonTotalAmountFilterd(personId: number, filter: string) {
        return this.db.getPersonTotalAmountFilterd(personId, filter);
    }

    public getTenMostPopularCurrencies(){
        let currenciesList = [];
        let counter = 0;
        for (var n in Currencies) {
          if (Currencies[n].code != "ALL") {
            currenciesList.push({value: n});
          }

          counter++;

          if(counter == 10){
              return currenciesList;
          }

        }
    }


}

var c = new Controller();
export default c;