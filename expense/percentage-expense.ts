import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { IExpense } from "./i-expense";

export class PercentageExpense implements IExpense {
    description: string;
    amount: Percentage;
    
    constructor(amount: Percentage, description: string) {
        this.amount = amount;
        this.description = description;
    }

    applyExpense(price: Money): Money {
        return price.multiply(this.amount);
    }

}