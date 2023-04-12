import { Money } from "../money/money";
import { ICap } from "./i-cap";

export class AbsoluteCap implements ICap {
    amount: Money;

    constructor(value: number) {
        this.amount = new Money(value);
    }

    applyCap(discountTotal: Money, price: Money): Money {
        return this.amount.equals(0) || discountTotal.lte(this.amount) ? discountTotal : this.amount;
    }
    
}