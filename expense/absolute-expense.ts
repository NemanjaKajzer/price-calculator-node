import { Money } from "../money/money";
import { IExpense } from "./i-expense";

export class AbsoluteExpense implements IExpense {
    description: string;
    amount: Money;
    
    constructor(amount: Money, description: string) {
        this.amount = amount;
        this.description = description;
    }

    applyExpense(price: Money): Money {
        return this.amount;
    }

    toString() {
        return `${this.description} = ${this.amount}\n`
    }

}