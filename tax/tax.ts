import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { ITax } from "./i-tax";

export class Tax implements ITax {
    percentage: Percentage;

    constructor(percentage: Percentage) {
        this.percentage = percentage;
    }

    applyTax(price: Money): Money {
        return price.multiply(this.percentage);
    }

}