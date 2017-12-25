import { Person } from "./Person";
import { Category } from "./Category";
//import { Money, Currencies }  from 'ts-money';
import { Money, Currencies, Currency } from '../../node_modules/ts-money/build/index';
import { PersonExpenseData } from "./PersonExpenseData";

export class Expense {

    tripId: number;
    description: string;
    amount: number;
    category: Category;
    //@deprecated persons: Array<Person>;
    date: Date;
    id: number;
    expenseCurrency: Currency;
    isDevided: boolean;
    expenseDataMap: Map<number, PersonExpenseData>

    /**
     * @param name cannot be empty and should contain at least 3 characters
     */
    public static isValidExpenseName(name: string) : boolean {
        return !(name == null || name.length < 3);
    }

    /**
     * @param amnt cannot be empty and should be a value greater than 0
     */
    public static isValidExpenseAmount(amnt: number) : boolean {
        return !(amnt == null || amnt < 0);
    }
    
    /**
     * @param date 
     */
    public static isValidExpenseDate(date: Date) : boolean {
        return !(date == null);
    }

    /**
     * Creates a new Expense with said parameters
     */
    constructor(tripId: number, description: string, category: Category, date: Date, amount: number , isDevided: boolean, expenseCurrency: Currency) {
        this.tripId = tripId;
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date  = date;
        this.expenseCurrency = expenseCurrency;
        this.isDevided = isDevided;
        this.expenseDataMap = new Map<number, PersonExpenseData[]>();
    }    

    public toString(): string {
        return this.description + ", " + this.amount + " " + this.expenseCurrency.code;
    }
}

/**
     *  @deprecated after domain refactoring
     *  checking out varargs
     *     
    public addPersons(...persons : Person[]) {
        if(persons!=null||persons.length>=0)
        persons.forEach(element=>{!this.personIsInList(element)?this.persons.push(element):null;});
    }

    private personIsInList(person: Person) : boolean {
        if (this.persons != null) {
            this.persons.forEach(element => {
                if (element.id === person.id) {
                    return true;
                }    
            });
        }
        return false;
    }
    */