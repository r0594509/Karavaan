import { Person } from "./Person";
import { Category } from "./Category";
//import { Money, Currencies }  from 'ts-money';
import { Money, Currencies, Currency } from '../../node_modules/ts-money/build/index';

export class Expense {

    description: string;
    amount: number;
    category: Category;
    owedPerson: Person;
    persons: Array<Person>;
    date: Date;
    id: number;
    defaultCurrency: Currency;

    /**
     * 
     * @param name cannot be empty and should contain at least 3 characters
     */
    public static isValidExpenseName(name: string) : boolean {
        return !(name == null || name.length < 3);
    }

    /**
     * 
     * @param amnt cannot be empty and should be a value greater than 0
     */
    public static isValidExpenseAmount(amnt: number) : boolean {
        return !(amnt == null || amnt < 0);
    }
    
    /**
     * 
     * @param date 
     */
    public static isValidExpenseDate(date: Date) : boolean {
        return !(date == null);
    }

    constructor(description: string, category: Category, date: Date, amount: number , defaultCurrency: Currency) {
        this.id = parseInt(Date.now() + "" + (Math.floor(Math.random() * 90000) + 10000));
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date  = date;
        this.defaultCurrency = defaultCurrency;
    }    

    addPersons(persons : Array<Person>){
        this.persons = persons;
    }

    addAmount(amount: number) {
        this.amount = amount;
    }

    toString(): string {
        return 
    }
}