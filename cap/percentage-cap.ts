import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";

export class PercentageCap {
    amount: Percentage;

    constructor(value: number) {
        this.amount = new Percentage(value);
    }

    applyCap(discountTotal: Money, price: Money): Money {
        const absoluteAmount = price.multiply(this.amount);
        return this.amount.equals(0) || discountTotal.lte(absoluteAmount) ? discountTotal : absoluteAmount;
    }
}